/**
 * Client entry point
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux'
import Loadable from 'react-loadable';
import routes from './routes';
import configureStore from './store';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const store = configureStore(initialState);
const mountApp = document.getElementById('root');

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            {renderRoutes(routes)}
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      mountApp
    );
  });
}

// For hot reloading of react components
if (module.hot && process.env.NODE_ENV !== 'production') {
  // module.hot.accept('./containers/App/App', () => {
  //   const NextApp = require('./containers/App/App').default;
  //   ReactDOM.hydrate(
  //     <AppContainer>
  //       <Provider store={store}>
  //         <BrowserRouter>
  //           <NextApp />
  //         </BrowserRouter>
  //       </Provider>
  //     </AppContainer>,
  //     mountApp
  //   )
  // });

  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes').default;
    ReactDOM.hydrate(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            {renderRoutes(nextRoutes)}
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      mountApp
    )
  });
}
