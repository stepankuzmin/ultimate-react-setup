import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from 'components/App';

const root = document.getElementById('root');
ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const App = require('./components/App').default;

    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      root
    );
  });
}
