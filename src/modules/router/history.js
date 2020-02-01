import { createBrowserHistory, createMemoryHistory } from 'history';

const isBrowser = !(
  Object.prototype.toString.call(global.process) === '[object process]' && !global.process.browser
);

export const history = isBrowser ? createBrowserHistory() : createMemoryHistory();
