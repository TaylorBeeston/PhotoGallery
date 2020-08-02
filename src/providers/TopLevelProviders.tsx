import React, { FC, ReactNode } from 'react';
import { LoginContextProvider } from 'contexts/LoginContext';
import { StatusContextProvider } from 'contexts/StatusContext';
import { ConfirmationContextProvider } from 'contexts/ConfirmationContext';
import { PhotosContextProvider } from 'contexts/PhotosContext';

const TopLevelProviders: FC<{ children: ReactNode }> = ({ children }) => (
  <LoginContextProvider>
    <StatusContextProvider>
      <ConfirmationContextProvider>
        <PhotosContextProvider>{children}</PhotosContextProvider>
      </ConfirmationContextProvider>
    </StatusContextProvider>
  </LoginContextProvider>
);

export default TopLevelProviders;
