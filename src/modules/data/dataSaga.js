import { call, put } from 'redux-saga/effects';

import * as actions from 'modules/data/actions';
import { getIP, geolocate } from 'modules/data/api';

export function* geolocateUser() {
  try {
    yield put(actions.getGeolocation());
    const ip = yield call(getIP);
    const geolocation = yield call(geolocate, ip);
    yield put(actions.geolocationRequestSucceeded(geolocation));
  } catch (error) {
    yield put(actions.geolocationRequestFailed(error));
  }
}

// eslint-disable-next-line no-empty-function
export function* dataSaga() {}
