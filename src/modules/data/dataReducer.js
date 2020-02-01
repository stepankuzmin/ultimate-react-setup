/* eslint-disable no-unused-vars */

const initialState = {};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@data/SUCCESS': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
