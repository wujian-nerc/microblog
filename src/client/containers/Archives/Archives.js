import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Counter from '../Counter/Counter';
import About from '../About/About';

function Archives ({ match }) {
  return (
    <div>
      <div>Archives Page?</div>
      <Switch>
        <Route path={`${match.url}/counter`} component={Counter} />
        <Route path={`${match.url}/about`} component={About} />
      </Switch>
    </div>
  );
}

export default Archives;
