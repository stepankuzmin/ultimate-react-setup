import { combineReducers } from 'redux';
import uiReducer from 'modules/ui';

const reducer = combineReducers({
  ui: uiReducer
});

export default reducer;
