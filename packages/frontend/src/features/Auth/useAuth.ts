import { createContext, useContext } from 'react';

export interface UserAuthData {
  firstName: string;
}

interface AuthContextData {
  token?: string;
  refreshToken?: string;
  user?: UserAuthData;
  setAuth: (user: UserAuthData, token: string) => void;
  resetAuth: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as any);

export const useAuth = () => useContext(AuthContext);

export const useMe = () => useAuth().user;
