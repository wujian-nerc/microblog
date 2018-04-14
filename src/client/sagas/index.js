import { all, fork } from 'redux-saga/effects';
import { incrementAsyncSaga } from './counterSaga';

export default function* rootSaga () {
  yield all([
    fork(incrementAsyncSaga)
  ]);
}
