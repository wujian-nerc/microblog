import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
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

  const store = createStore(rootReducer, initialState, compose(...enhencers));
  let sagaTask = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // reducer reload
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
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