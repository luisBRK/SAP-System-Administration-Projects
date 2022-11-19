import { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';

export interface AuthState {}

const AUTH_INITIAL_VALUES: AuthState = {};

interface ProviderProps {
  children: JSX.Element;
}

export const EntriesProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_VALUES);

  const {} = state;

  const valuesProvider = {};
  return <AuthContext.Provider value={valuesProvider}>{children}</AuthContext.Provider>;
};
