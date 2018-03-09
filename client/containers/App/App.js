/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Route,
  Switch
} from 'react-router-dom';
import Home from '../Home/Home';
import Archives from '../Archives/Archives';
import About from '../About/About';
import styles from './App.less';

export default function App (props) {
  return (
    <div className={styles.content}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/archives" component={Archives} />
        <Route exact path="/about" component={About} />
      </Switch>
    </div>
  );
}

App.propTypes = {
  // store: PropTypes.object.isRequired
};
