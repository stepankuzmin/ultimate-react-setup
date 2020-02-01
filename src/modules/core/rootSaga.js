import { all, spawn } from 'redux-saga/effects';

import { uiSaga } from 'modules/ui';

const sagas = [uiSaga];

export function* rootSaga() {
  yield all(sagas.map(spawn));
}
