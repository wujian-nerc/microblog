/**
 * Client entry point
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './containers/App/App';
import configureStore from './store';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const store = configureStore(initialState);
const mountApp = document.getElementById('root');

ReactDOM.hydrate(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./containers/App/App', () => {
    const NextApp = require('./containers/App/App').default;
    ReactDOM.hydrate(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <NextApp />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      mountApp
    )
  });
}
