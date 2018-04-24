import reducerRegistry from './reducerRegistry';
import { actionTypes } from '../actions/counter';

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
