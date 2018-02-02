/**
 * Client entry point
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import App from './App';

const store = {};
const mountApp = document.getElementById('root');

ReactDOM.render(
  <App store={store} />,
  mountApp
);

// For hot reloading of react components
if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
