import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';

import routes from 'routes';
import Navigation from 'components/Navigation';
import { history } from 'modules/router';
import styles from './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className={styles.App}>
        <Navigation />
        {renderRoutes(routes)}
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
