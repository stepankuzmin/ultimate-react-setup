import { combineReducers } from 'redux';

import { uiReducer } from 'modules/ui';
import { userReducer } from 'modules/user';
import { routerReducer } from 'modules/router';

export const createRootReducer = (history) => combineReducers({
  ui: uiReducer,
  user: userReducer,
  router: routerReducer(history)
});
