// action types
export const actionTypes = {
  INCREMENT: 'INCREMENT',
  INCREMENT_ASYNC: 'INCREMENT_ASYNC',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET_COUNTER'
};

export const actions = {
  increment () {
    return {
      type: actionTypes.INCREMENT
    };
  },
  incrementAsync () {
    return {
      type: actionTypes.INCREMENT_ASYNC
    }
  },
  decrement () {
    return {
      type: actionTypes.DECREMENT
    };
  },
  reset () {
    return {
      type: actionTypes.RESET
    };
  }
};