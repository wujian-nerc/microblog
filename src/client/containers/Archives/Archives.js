import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from  'react-router-config';

function Archives (props) {
  return (
    <div>
      <div>Archives Page?</div>
      {renderRoutes(props.route.routes)}
    </div>
  );
}

export default Archives;
