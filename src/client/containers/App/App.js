/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import styles from './App.css';

function App (props) {
  return (
    <div className={styles.app}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/archives">Archives</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/counter">Counter</Link></li>
      </ul>
      {renderRoutes(props.route.routes, props)}
    </div>
  );
}

App.propTypes = {
  // store: PropTypes.object.isRequired
};

export default withRouter(App)
