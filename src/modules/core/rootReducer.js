import { combineReducers } from 'redux';

import { uiReducer } from 'modules/ui';
import { routerReducer } from 'modules/router';

export const rootReducer = combineReducers({
  ui: uiReducer,
  router: routerReducer
});
