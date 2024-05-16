import { useState } from 'react';

import { AuthContext, type UserAuthData } from './useAuth';

export interface SignInBody {
  username: string;
  password: string;
}

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserAuthData>();
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');

  const setAuth = (newUser: UserAuthData, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
  };

  const resetAuth = () => {
    setUser(undefined);
    setToken('');
  };

  return <AuthContext.Provider value={{ token, user, setAuth, resetAuth }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
