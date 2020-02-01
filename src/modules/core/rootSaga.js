import { all, spawn } from 'redux-saga/effects';

import { uiSaga } from 'modules/ui';
import { dataSaga } from 'modules/data';

const sagas = [uiSaga, dataSaga];

export function* rootSaga() {
  yield all(sagas.map(spawn));
}
