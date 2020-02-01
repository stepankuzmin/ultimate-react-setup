import { call, put } from 'redux-saga/effects';
import { getIP, geolocate } from 'modules/data/api';
import * as actions from 'modules/data/actions';

export function* geolocateUser() {
  const ip = yield call(getIP);
  const geolocation = yield call(geolocate, ip);
  return geolocation;
}

/* eslint-disable-next-line no-unused-vars */
export function* serverSideSaga(req = {}) {
  try {
    yield put(actions.getGeolocation());
    const geolocation = yield geolocateUser();
    yield put(actions.geolocationRequestSucceeded(geolocation));
  } catch (error) {
    yield put(actions.geolocationRequestFailed(error));
  }
}

// eslint-disable-next-line no-empty-function
export function* dataSaga() {}
