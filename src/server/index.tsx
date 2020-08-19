import store from '@common/store';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import path from 'path';
import { Provider } from 'react-redux';
import React from 'react';
import express from 'express';
import cookieParser from 'cookie-parser';
import { matchPath, StaticRouter } from 'react-router-dom';
import dotenv from 'dotenv';
import Loadable from 'react-loadable';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import routes from '@common/routes';
import { all } from 'redux-saga/effects';
import App from '@common/App';
import { getBundles } from 'react-loadable/webpack';
import mime from 'mime-types';
import { IChunk, IError, IRouterContext } from '@server/types';
import initApm from 'elastic-apm-node';

import logger from './middleware/logger';
import getBasicSettings from './middleware/basicSettings';
import getExitHandler from './middleware/exitHandler';
import HealthRoutes from './routes/health';
import getHtml, { IProps as IHTMLProps } from './html';
import chunks from './chunk-manifest.json';
import loadableModulesJson from './react-loadable.json';

declare const __DEV__: boolean;

dotenv.config();

Loadable.preloadAll();

getExitHandler();
const app = express();
app.use(cookieParser());
getBasicSettings(app);
app.use('/health', HealthRoutes);
// ---------------------------------------------------------------------
// Register Node.js middleware
// ---------------------------------------------------------------------
app.use(
  express.static(path.resolve(__dirname, 'public'), {
    maxAge: '30d',
    setHeaders(res, filePath: string): void {
      if (mime.lookup(filePath) === 'text/html') {
        res.setHeader('Cache-Control', 'public, max-age=0');
      } else if (mime.lookup(filePath) === 'font/opentype') {
        res.setHeader('Cache-Control', 'public, max-age=1yr');
      }
    },
  }),
);

if (!__DEV__) {
  const apm = initApm.start({
    serviceName: process.env.APM_SERVER_NAME,
    serverUrl: process.env.APM_SERVER_URL,
  });

  logger.info(`APM intialized ${apm}`);
}

app.get('/sw.js', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'public/assets/sw.js'));
});

// tslint:disable-next-line:no-big-function
app.get('*', async (req, res, next) => {
  try {
    const sagas: Generator[] = [];

    routes.forEach(route => {
      const match = matchPath(req.url, route);
      if (match && route && route.loadData) {
        sagas.push(route.loadData());
      }
    });

    await store.runSaga(function*(): Generator {
      yield all([sagas]);
    }).done;
    const scripts = new Set();
    const htmlData: IHTMLProps = {
      head: '',
      style: '',
      scripts: [],
      children: '',
      secrets: {},
      data: null,
      bodyAttrs: ''
    };

    const context: IRouterContext = {};
    const sheet = new ServerStyleSheet();
    const modules: string[] = [];
    const addChunk = (chunkName: string) => {
      if ((chunks as IChunk)[chunkName]) {
        chunks[chunkName].forEach((asset: string) => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunkName}' cannot be found`);
      }
    };
    const getModules = (moduleName: string) => {
      return modules.push(moduleName);
    };
    htmlData.children = ReactDOM.renderToString(
      <Provider store={store}>
        <Loadable.Capture report={getModules}>
          <StyleSheetManager sheet={sheet.instance}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </StyleSheetManager>
        </Loadable.Capture>
      </Provider>,
    );

    if (context.status === 301 || context.status === 302) {
      return res.redirect(context.status, context.url as string);
    }

    htmlData.head = `
    ${Helmet.renderStatic().title.toString()}
    ${Helmet.renderStatic().meta.toString()}
    `;

    htmlData.bodyAttrs = Helmet.renderStatic().bodyAttributes.toString();

    htmlData.style = sheet.getStyleTags();

    htmlData.secrets = {
      ENV: process.env.NODE_ENV,
    };

    addChunk('client');

    // tslint:disable-next-line:no-any
    const bundles = getBundles(loadableModulesJson as any, modules);

    logger.info(`Bundles created`);

    bundles.forEach(bundle => {
      scripts.add(bundle.publicPath);
    });

    htmlData.data = store.getState();
    htmlData.scripts = [...(Array.from(scripts) as string[])];

    const html = getHtml(htmlData);

    res.status(context.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});
// ---------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------

app.use(
  (
    err: IError,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    logger.error(err);

    const htmlData = {
      head: `
    <title>${err.message}</title>
    <meta name="description">Error</meta>
  `,
      style: '',
      scripts: [],
      secrets: {},
      data: null,
      noScriptForGTA: '',
      scriptForGTA: '',
      bodyAttributes: '',
      bodyAttrs: '',
      children: ReactDOM.renderToString(<></>),
    };
    const html = getHtml(htmlData);
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
  },
);
// ---------------------------------------------------------------------
// Launch the server
// ---------------------------------------------------------------------
if (!module.hot) {
  // tslint:disable-next-line:no-any
  const port = (process.env as any).PORT;
  Loadable.preloadAll()
    .then(() => {
      app.listen(port, () => {
        logger.info(`The server is running at http://localhost:${port}/`);
      });
    })
    .catch(error => {
      logger.error(error);
    });
}
// ---------------------------------------------------------------------
// Hot Module Replacement
// ---------------------------------------------------------------------
if (module.hot) {
  // tslint:disable-next-line:no-string-literal
  app['hot'] = module.hot;
  module.hot.accept('./index', () => {
    logger.info('hot reloading...');
  });
}

// tslint:disable-next-line:max-file-line-count
export default app;
