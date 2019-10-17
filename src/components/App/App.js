import React from 'react';
import { renderRoutes } from 'react-router-config';

import routes from 'routes';
import Navigation from 'components/Navigation';

import styles from './App.css';

const App = () => (
  <div className={styles.App}>
    <Navigation />
    {renderRoutes(routes)}
  </div>
);

export default App;
