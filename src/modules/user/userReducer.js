import * as constants from './constants';

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.USER_GEOLOCATION_FETCH_SUCCEEDED: {
      const geolocation = action.payload;
      return { ...state, ...geolocation };
    }
    default:
      return state;
  }
};
