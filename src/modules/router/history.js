import { createBrowserHistory, createMemoryHistory } from 'history';
import { isBrowser } from 'utils/isBrowser';

export const history = isBrowser ? createBrowserHistory() : createMemoryHistory();
