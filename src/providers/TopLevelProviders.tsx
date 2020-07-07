import React, { FC, ReactNode } from 'react';
import { LoginContextProvider } from 'contexts/LoginContext';
import { StatusContextProvider } from 'contexts/StatusContext';
import { ConfirmationContextProvider } from 'contexts/ConfirmationContext';

const TopLevelProviders: FC<{ children: ReactNode }> = ({ children }) => (
  <LoginContextProvider>
    <StatusContextProvider>
      <ConfirmationContextProvider>{children}</ConfirmationContextProvider>
    </StatusContextProvider>
  </LoginContextProvider>
);

export default TopLevelProviders;
