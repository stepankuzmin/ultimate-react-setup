import { put } from 'redux-saga/effects';

export function* uiSaga() {
  yield put({ type: '@ui/TEST' });
}
