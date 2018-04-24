import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects';
import reducerRegistry from './reducers/reducerRegistry';
import sagaRegistry from './sagas/sagaRegistry';
// import rootReducer from './reducers';
// import rootSaga from './sagas';

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
  const _combineReducers = (reducers) => {
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach((item) => {
      if (reducerNames.indexOf(item) === -1) {
        reducers[item] = (state = null) => state;
      }
    });
    return combineReducers(reducers);
  }

  // combine saga
  const _combineSagas = (sagas) => {
    console.log(sagas);
    return function* () {
      yield all(sagas.map((saga) => fork(saga)));
    }
  }

  const reducer = _combineReducers(reducerRegistry.getReducers());
  // const store = createStore(rootReducer, initialState, compose(...enhencers));
  const store = createStore(reducer, initialState, compose(...enhencers));
  
  // saga dynamic import
  // let sagaTask = sagaMiddleware.run(rootSaga);
  const saga = _combineSagas(sagaRegistry.getSagas());
  let sagaTask = sagaMiddleware.run(saga);

  // reducer dynamic import
  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(_combineReducers(reducers));
  });

  // saga dynamic import
  sagaRegistry.setChangeListener(sagas => {
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(_combineSagas(sagas));
    })
  })

  if (module.hot) {
    // reducer reload
    module.hot.accept('./reducers', () => {
      // const nextReducer = require('./reducers').default;
      const nextReducer = _combineReducers(reducerRegistry.getReducers());
      store.replaceReducer(nextReducer);
    });

    // saga reload
    module.hot.accept('./sagas', () => {
      // const nextSaga = require('./sagas').default;
      const nextSaga = _combineSagas(sagaRegistry.getSagas());
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSaga);
      });
    })
  }

  return store;
}