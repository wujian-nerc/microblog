/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home/Home';
import Archives from '../Archives/Archives';
import About from '../About/About';
import Counter from '../Counter/Counter';
import styles from './App.css';

export default function App (props) {
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/archives" component={Archives} />
        <Route path="/about" component={About} />
        <Route path="/counter" component={Counter} />
        <Redirect from="/modal" to="/" />
      </Switch>
    </div>
  );
}

App.propTypes = {
  // store: PropTypes.object.isRequired
};
