import * as constants from './constants';

export const getUserGeolocation = () => ({
  type: constants.USER_GEOLOCATION_FETCH_REQUESTED,
  payload: {}
});

export const userGeolocationRequestSucceeded = (geolocation) => ({
  type: constants.USER_GEOLOCATION_FETCH_SUCCEEDED,
  payload: geolocation
});

export const userGeolocationRequestFailed = (error) => ({
  type: constants.USER_GEOLOCATION_FETCH_FAILED,
  payload: error
});
