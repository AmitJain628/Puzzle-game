import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import core from 'express-serve-static-core';

import logger from './logger';

export default (app: core.Express) => {
  // tslint:disable-next-line:no-string-literal
  global['navigator'] = global['navigator'] || {};
  // tslint:disable-next-line:no-string-literal
  global['navigator'].userAgent = global['navigator'].userAgent || 'all';
  const isProd = process.env.NODE_ENV !== 'development';
  if (isProd) {
    app.use(morgan('dev'));
    app.use(logger.getRequestLogger);
  }

  app.use(compression());
  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.json());
};
