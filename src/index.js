import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';

import App from 'components/App';
import reducer from 'modules';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState);

const root = document.getElementById('root');

loadableReady(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    root
  );
});

if (module.hot) {
  module.hot.accept('./modules', () => {
    // eslint-disable-next-line
    const nextRootReducer = require('./modules').default;
    store.replaceReducer(nextRootReducer);
  });

  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const NextApp = require('./components/App').default;

    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </BrowserRouter>,
      root
    );
  });
}
