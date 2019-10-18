import loadable from '@loadable/component';

const routes = [
  {
    path: '/',
    exact: true,
    component: loadable(() => import('./pages/Home'))
  },
  {
    path: '/about',
    exact: true,
    component: loadable(() => import('./pages/About'))
  }
];

export default routes;
