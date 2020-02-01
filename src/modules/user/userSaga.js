import { call, put, takeEvery } from 'redux-saga/effects';

import * as actions from 'modules/user/actions';
import * as constants from 'modules/user/constants';
import { getIpInfo } from 'modules/user/api';

export function* geolocateUser() {
  try {
    const ipInfo = yield call(getIpInfo);
    yield put(actions.userGeolocationRequestSucceeded(ipInfo));
  } catch (error) {
    yield put(actions.userGeolocationRequestFailed(error));
  }
}

export function* userSaga() {
  yield takeEvery(constants.USER_GEOLOCATION_FETCH_REQUESTED, geolocateUser);
}
