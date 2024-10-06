import * as types from './actionConstants';

export const setUI = (payload) => ({
  type: types.SET_UI,
  payload,
});

export const init = () => ({
  type: types.INIT,
});
export const agentInit = () => ({
  type: types.AGENT_INIT,
});
export const setAdmin = (payload) => ({
  type: types.SET_ADMIN,
  payload,
});

export const refreshUserDetails = () => ({
  type: types.REFRESH_ADMIN_DETAILS,
});
export const setAgent = (payload) => ({
  type: types.SET_AGENT,
  payload,
});
