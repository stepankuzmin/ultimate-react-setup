import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const root = document.getElementById('root');
ReactDOM.hydrate(<App />, root);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const App = require('./components/App').default;
    ReactDOM.render(<App />, root);
  });
}
