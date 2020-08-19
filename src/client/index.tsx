import App from '@common/App';
import deepForceUpdate from 'react-deep-force-update';
import Lodable from 'react-loadable';
import { History } from 'history';
import ReactDOM from 'react-dom';
import React, { ReactNode } from 'react';
import { Router } from 'react-router-dom';
import rootSaga from '@common/store/sagas';
import store from '@common/store';
import { Provider } from 'react-redux';
import { logError } from '@utils/index';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

import history from './history';

declare const __DEV__: boolean;

export interface IWindow extends Window {
  __INITIAL_STATE__: object;
  __SECRETS__: {
    LANGUAGE_CODE: string;
  };
  dataLayer: object[];
}

const container = document.getElementById('app');
let currentLocation = (history as History).location;
let appInstance: ReactNode | void;

store.runSaga(rootSaga);
// Re-render the app when window.location changes
// tslint:disable-next-line:cognitive-complexity
async function onLocationChange(
  location: History['location'],
  action?: string
): Promise<void> {
  currentLocation = location;

  const isInitialRender = !action;
  try {
    const renderReactApp =
      isInitialRender && !__DEV__ ? ReactDOM.hydrate : ReactDOM.render;
    await Lodable.preloadReady();
    appInstance = renderReactApp(
        <Provider store={store}>
          <Router history={history as History}>
            <App />
          </Router>
        </Provider>,
      container,
      () => {
        if (
          isInitialRender &&
          window.history &&
          'scrollRestoration' in window.history
        ) {
          // Switch off the native scroll restoration behavior and handle it manually
          // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
          window.history.scrollRestoration = 'manual';
        }
      }
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      logError('RSK will reload your page after error');
      window.location.reload();
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
const bootstrapApp = () => {
  (history as History).listen(onLocationChange);
  onLocationChange(currentLocation).catch(error => {
    logError(error);
  });
};
if (__DEV__) {
  import('mimic').then(bootstrapApp);
} else {
  bootstrapApp();
}

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./index', () => {
    // tslint:disable-next-line:no-string-literal
    if (appInstance && appInstance['updater'].isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }
    onLocationChange(currentLocation).catch(error => {
      logError(error);
    });
  });
}
