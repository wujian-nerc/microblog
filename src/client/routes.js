import React from 'react';
import Loadable from 'react-loadable';
import Loading from './components/Loading/Loading';
import App from './containers/App/App';

// const getAsyncComponent = ({ component, models=[] }) => {
//   // const loaders = {
//   //   Component: () => import(component)
//   // };
//   // models.forEach((model, index) => {
//   //   loaders[index] = () => import(model);
//   // });

//   // const AsyncComponent = Loadable.Map({
//   const AsyncComponent = Loadable({
//     loader: () => import(component),
//     loading: Loading,
//     // render (loaded, props) {
//     //   const Component = loaded.default;
//     //   return <Component {...props} />
//     // }
//   });

//   return AsyncComponent;
// }

// const AsyncAbout = getAsyncComponent({
//   component: './containers/About/About'
// });

// const AsyncHome = getAsyncComponent({
//   component: './containers/Home/Home'
// });

// const AsyncCounter = getAsyncComponent({
//   component: './containers/Counter/Counter',
//   // models: [ './reducers/counter' ]
// });

// const AsyncArchives = getAsyncComponent({
//   component: './containers/Archives/Archives',
//   // models: [ './reducers/counter' ]
// });

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
  loading: Loading,
  modules: ['about']
});

const AsyncCounter = Loadable({
  loader: () => import(
    /* webpackChunkName: "counter" */
    './containers/Counter/Counter'
  ),
  loading: Loading,
  modules: ['counter']
});

const AsyncArchives = Loadable({
  loader: () => import(
    /* webpackChunkName: "archives" */
    './containers/Archives/Archives'
  ),
  loading: Loading,
  modules: ['archives']
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