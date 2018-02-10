/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
// import routes from './routes';

export default function App (props) {
  return (
    // <Provider store={props.store}>
    //   <Router history={browserHistory} />
    // </Provider>

    <div>
      <h1>Hello, this is a microblog!</h1>
    </div>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired
};
