import React from 'react';
import Loadable from 'react-loadable';
import Loading from './components/Loading/Loading';
import App from './containers/App/App';

const AsyncHome = Loadable({
  loader: () => import(
    /* webpackChunkName: "home" */
    './containers/Home/Home'
  ),
  loading: Loading
});

const AsyncAbout = Loadable({
  loader: () => import(
    /* webpackChunkName: "about" */
    './containers/About/About'
  ),
  loading: Loading
});

const AsyncCounter = Loadable.Map({
  loader: {
    Counter: () => import(
      /* webpackChunkName: "counter" */
      './containers/Counter/Counter'
    ),
    model: () => import(
      /* webpackChunkName: "counter-model" */
      './reducers/counter'
    )
  },
  loading: Loading,
  render (loaded, props) {
    const Counter = loaded.Counter.default;
    return <Counter {...props} />;
  }
});

const AsyncArchives = Loadable({
  loader: () => import(
    /* webpackChunkName: "archives" */
    './containers/Archives/Archives'
  ),
  loading: Loading,
});

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: AsyncHome
      },
      {
        path: '/archives',
        component: AsyncArchives
      },
      {
        path: '/about',
        component: AsyncAbout
      },
      {
        path: '/counter',
        component: AsyncCounter
      }
    ]
  }
];

export default routes;