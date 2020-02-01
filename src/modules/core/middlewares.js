import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { history } from 'modules/router';

export const sagaMiddleware = createSagaMiddleware();
export const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    collapsed: true
  });

  middlewares.push(logger);
}
