import { all, spawn } from 'redux-saga/effects';

import { uiSaga } from 'modules/ui';
import { userSaga } from 'modules/user';

const sagas = [uiSaga, userSaga];

export function* rootSaga() {
  yield all(sagas.map(spawn));
}
