import React, { FC } from 'react';
import Routes from 'components/Routes';
import { LoginContextProvider } from 'contexts/LoginContext';

const App: FC = () => (
  <LoginContextProvider>
    <div className="min-h-screen fancy-bg">
      <Routes />
    </div>
  </LoginContextProvider>
);

export default App;
