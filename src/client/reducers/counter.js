import reducerRegistry from './reducerRegistry';

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

// initial sate
const initialState = {
  counter: 0
};

function reducer (state = initialState, action) {
  switch(action.type) {
    case actionTypes.INCREMENT:
      return {
        counter: state.counter + 1
      };

    case actionTypes.DECREMENT:
      return {
        counter: Math.max(state.counter - 1, 0)
      };

    case actionTypes.RESET:
      return {
        counter: 0
      };

    default:
      return state;
  }
}

reducerRegistry.register('counter', reducer);

export default reducer;