import createSagaMiddleware, { END, SagaMiddleware } from 'redux-saga';
import { applyMiddleware, compose, createStore, Store } from 'redux';

import rootReducer, { RootState } from './reducers/index';
declare const __DEV__: boolean;

export interface IWindow extends Window {
  __INITIAL_STATE__: object;
  __SECRETS__: {
    ENV: string;
  };
}
interface IStore extends Store<RootState> {
  runSaga: SagaMiddleware<{}>['run'];
  close(): void;
}

export const configureStore = (initialState: object = {}) => {
  const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    __DEV__ &&
    // tslint:disable-next-line:no-string-literal
    (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose)
      ? // tslint:disable-next-line:no-string-literal
        (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose)
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, initialState, enhancer) as IStore;

  store.runSaga = sagaMiddleware.run;

  store.close = () => {
    store.dispatch(END);
  };

  if (
    __DEV__ &&
    typeof window === 'object' &&
    process.env.NODE_ENV !== 'production' &&
    module.hot
  ) {
    module.hot.accept('../store/reducers', () => {
      import('./reducers').then(module => {
        store.replaceReducer(module.default);
      });
    });
  }

  return store;
};

let store: IStore;
try {
  // tslint:disable-next-line:no-string-literal
  const initialState = window['__INITIAL_STATE__'];
  store = configureStore(initialState);
} catch (_e) {
  store = configureStore();
}

export default store;
