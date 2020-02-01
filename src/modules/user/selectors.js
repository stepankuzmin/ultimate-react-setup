import { createSelector } from 'reselect';

export const getUser = (state) => state.user;

export const getUserIP = createSelector(
  getUser,
  (user) => user.ip
);
