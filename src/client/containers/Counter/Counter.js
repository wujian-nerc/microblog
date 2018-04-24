import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { actions } from '../../actions/counter';

function Counter (props) {
  const {
    counter,
    increment,
    incrementAsync,
    decrement,
    reset
  } = props;

  return (
    <div>
      <div>
        <span>计数器：</span>
        <span>{counter}</span>
      </div>
      <div>
        <button onClick={increment}>Add</button>
        <button onClick={incrementAsync}>Add Sync</button>
        <button onClick={decrement}>Reduce</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

function mapStateToProps (state) {
  return {
    counter: state.counter.counter
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
