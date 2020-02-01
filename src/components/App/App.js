import React from 'react';
import { renderRoutes } from 'react-router-config';

import Navigation from 'components/Navigation';
import { routes } from 'routes';
import styles from './App.css';

const App = () => (
  <div className={styles.App}>
    <Navigation />
    {renderRoutes(routes)}
  </div>
);

export default App;
