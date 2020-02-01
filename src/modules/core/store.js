import { createStore as createReduxStore, applyMiddleware } from 'redux';

import { rootReducer } from 'modules/core/rootReducer';
import { middlewares } from 'modules/core/middlewares';

// eslint-disable-next-line max-len
export const createStore = (preloadedState = {}) => createReduxStore(rootReducer, preloadedState, applyMiddleware(...middlewares));
