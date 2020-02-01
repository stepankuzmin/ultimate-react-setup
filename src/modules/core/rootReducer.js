import { combineReducers } from 'redux';
import { uiReducer } from 'modules/ui';

export const rootReducer = combineReducers({
  ui: uiReducer
});
