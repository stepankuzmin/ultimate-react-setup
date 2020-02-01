import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    collapsed: true
  });

  middlewares.push(logger);
}
