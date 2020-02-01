import loadable from '@loadable/component';
import { matchPath } from 'react-router-dom';

import { geolocateUser } from 'modules/data/dataSaga';

export const routes = [
  {
    path: '/',
    exact: true,
    serverSideSaga: geolocateUser,
    component: loadable(() => import('./pages/Home'))
  },
  {
    path: '/about',
    exact: true,
    component: loadable(() => import('./pages/About'))
  }
];

export const getActiveRoute = (url) => routes.find((route) => matchPath(url, route));

export default routes;
