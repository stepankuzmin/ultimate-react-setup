import * as constants from './constants';

export const getGeolocation = () => ({
  type: constants.GEOLOCATION_FETCH_REQUESTED,
  payload: {}
});

export const geolocationRequestSucceeded = (geolocation) => ({
  type: constants.GEOLOCATION_FETCH_SUCCEEDED,
  payload: geolocation
});

export const geolocationRequestFailed = (error) => ({
  type: constants.GEOLOCATION_FETCH_FAILED,
  payload: error
});
