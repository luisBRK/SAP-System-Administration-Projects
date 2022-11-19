import { AuthState } from './';

type AuthActionTypes = { type: 'AUTH_LOGIN' };

export const authReducer = (state: AuthState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return { ...state };

    default:
      return state;
  }
};
