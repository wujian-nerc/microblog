import React from 'react';
import PropTypes from 'prop-types';

function Loading (props) {
  console.log('Loading');

  if (props.error) {
    return <div>{`${props.error}`}</div>;
  } else if (props.timedOut) {
    return <div>Taking a long time...</div>
  } else if (props.postDelay) {
    return <div>Loading...</div>;  
  } else {
    return null; 
  }
}

export default Loading;
