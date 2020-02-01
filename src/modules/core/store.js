/* eslint-disable implicit-arrow-linebreak */
import { createStore as createReduxStore, applyMiddleware } from 'redux';

import { rootReducer } from 'modules/core/rootReducer';
import { middlewares } from 'modules/core/middlewares';

export const createStore = (preloadedState = {}) =>
  createReduxStore(rootReducer, preloadedState, applyMiddleware(...middlewares));
