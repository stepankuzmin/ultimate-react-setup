import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';

const root = document.getElementById('root');
ReactDOM.hydrate(<App />, root);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const App = require('./components/App').default;
    ReactDOM.render(<App />, root);
  });
}
