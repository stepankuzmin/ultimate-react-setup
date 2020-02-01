import { call, put } from 'redux-saga/effects';
import { matchPath } from 'react-router-dom';

import routes from 'routes';
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

export function* serverSideSaga(req = {}) {
  const activeRoute = routes.find((route) => matchPath(req.originalUrl, route));
  if (!activeRoute || !activeRoute.serverSideSaga) {
    return;
  }

  yield activeRoute.serverSideSaga(req);
}

// eslint-disable-next-line no-empty-function
export function* dataSaga() {}
