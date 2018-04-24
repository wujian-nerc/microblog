import { call, put, take, takeEvery } from 'redux-saga/effects';
import sagaRegistry from './sagaRegistry';
import { actionTypes } from '../actions/counter'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function* incrementAsync () {
  yield call(delay, 1000);
  yield put({ type: actionTypes.INCREMENT });
}

export function* incrementAsyncSaga () {
  yield takeEvery(actionTypes.INCREMENT_ASYNC, incrementAsync);
}

sagaRegistry.register(incrementAsyncSaga);
