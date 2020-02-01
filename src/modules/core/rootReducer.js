import { combineReducers } from 'redux';

import { uiReducer } from 'modules/ui';
import { dataReducer } from 'modules/data';
import { routerReducer } from 'modules/router';

export const rootReducer = combineReducers({
  ui: uiReducer,
  data: dataReducer,
  router: routerReducer
});
