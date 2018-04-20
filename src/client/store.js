import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducerRegistry from './reducers/reducerRegistry';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore (initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhancer = applyMiddleware(sagaMiddleware);
  const enhencers = [middlewareEnhancer];

  // redux devTools
  if (process.env.BROWSER && process.env.NODE_ENV === 'development') {
    const debugEnhancer = (window && window.__REDUX_DEVTOOLS_EXTENSION__)
                          ? window.__REDUX_DEVTOOLS_EXTENSION__()
                          : (f) => f;
    enhencers.push(debugEnhancer);
  }

  // combine reducer and presever initial state for not yet loaded reducers
  // const combine = (reducers) => {
  //   const reducerNames = Object.keys(reducers);
  //   Object.keys(initialState).forEach((item) => {
  //     if (reducerNames.indexOf(item) === -1) {
  //       reducers[item] = (state = null) => state;
  //     }
  //   });
  //   return combineReducers(reducers);
  // }

  // const reducer = combine(reducerRegistry.getReducers());
  const store = createStore(rootReducer, initialState, compose(...enhencers));
  // const store = createStore(reducer, initialState, compose(...enhencers));
  
  // reducer dynamic import
  // reducerRegistry.setChangeListener(reducers => {
  //   store.replaceReducer(combine(reducers));
  // });

  let sagaTask = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // reducer reload
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      // const nextReducer = reducerRegistry.getReducers();
      store.replaceReducer(nextReducer);
    });

    // saga reload
    module.hot.accept('./sagas', () => {
      const nextSaga = require('./sagas').default;
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSaga);
      });
    })
  }

  return store;
}