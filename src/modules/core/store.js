import sagaMonitor from '@redux-saga/simple-saga-monitor';
import createSagaMiddleware, { END } from 'redux-saga';
import { createStore as createReduxStore, applyMiddleware } from 'redux';

import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from 'modules/core/rootReducer';

export const createStore = (history, preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const { createLogger } = require('redux-logger');
    const logger = createLogger({
      collapsed: true
    });

    middlewares.push(logger);
  }

  const rootReducer = createRootReducer(history);
  const store = createReduxStore(rootReducer, preloadedState, applyMiddleware(...middlewares));
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};
