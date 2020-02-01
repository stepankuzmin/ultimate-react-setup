import * as constants from './constants';

const initialState = {};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GEOLOCATION_FETCH_SUCCEEDED: {
      const geolocation = action.payload;
      return { ...state, ...geolocation };
    }
    default:
      return state;
  }
};
