import React, { createContext } from 'react';
import useLoggedIn from 'hooks/useLoggedIn';
import useLogout from 'hooks/useLogout';

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const { isLoggedIn } = useLoggedIn();
  const { logout } = useLogout();

  return (
    <LoginContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
