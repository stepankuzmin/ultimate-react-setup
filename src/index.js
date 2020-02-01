import React from 'react';
import ReactDOM from 'react-dom';
import { history } from 'modules/router';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import { ConnectedRouter } from 'connected-react-router';

import App from 'components/App';
import { createStore } from 'modules/core';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore(preloadedState);

const root = document.getElementById('root');

loadableReady(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    root
  );
});

if (module.hot) {
  module.hot.accept('./modules/core/rootReducer', () => {
    // eslint-disable-next-line
    const { rootReducer } = require('./modules/core/rootReducer');
    store.replaceReducer(rootReducer);
  });

  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NextApp />
        </ConnectedRouter>
      </Provider>,
      root
    );
  });
}
