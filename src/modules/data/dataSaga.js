import { put } from 'redux-saga/effects';

export function* serverSideSaga(req) {
  console.log('serverSideSaga', req.originalUrl);
  yield put({ type: '@data/SUCCESS', payload: { ok: 200 } });
}

// eslint-disable-next-line no-empty-function
export function* dataSaga() {}
