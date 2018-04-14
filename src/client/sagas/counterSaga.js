import { call, put, take, takeEvery } from 'redux-saga/effects';
import { actionTypes } from '../reducers/counter'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function* incrementAsync () {
  yield call(delay, 1000);
  yield put({ type: actionTypes.INCREMENT });
}

export function* incrementAsyncSaga () {
  yield takeEvery(actionTypes.INCREMENT_ASYNC, incrementAsync);
}