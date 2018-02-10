/**
 * Client entry point
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

const store = {};
const mountApp = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
