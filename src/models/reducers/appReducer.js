import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  user: {},
  isAuthenticated: false,
  isLoading: true,
  unreadNotifications: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...initialState,
        isLoading: false,
      };
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.userRole,
      };
    default:
      return state;
  }
};

export default appReducer;
