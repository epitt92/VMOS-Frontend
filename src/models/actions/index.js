import * as ACTION_TYPES from './action_types';

export const loginSuccess = () => ({ type: ACTION_TYPES.LOGIN_SUCCESS });

export const loginFailure = () => ({ type: ACTION_TYPES.LOGIN_FAILURE });

export const logout = () => ({ type: ACTION_TYPES.LOGOUT });

export const setUser = payload => ({ type: ACTION_TYPES.SET_USER, payload });
export const setUserImage = payload => ({ type: ACTION_TYPES.SET_USER_IMAGE, payload });

export const setNotifications = payload => ({ type: ACTION_TYPES.SET_NOTIFICATIONS, payload });