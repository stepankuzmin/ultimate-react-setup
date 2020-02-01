import { connectRouter } from 'connected-react-router';
import { history } from 'modules/router/history';

export const routerReducer = connectRouter(history);
