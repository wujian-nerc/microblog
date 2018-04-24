import { all, fork } from 'redux-saga/effects';
import { incrementAsyncSaga } from './counter';

export default function* rootSaga () {
  yield all([
    fork(incrementAsyncSaga)
  ]);
}
