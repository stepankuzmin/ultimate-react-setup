import loadable from '@loadable/component';
import { geolocateUser } from 'modules/data/dataSaga';

const routes = [
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

export default routes;
