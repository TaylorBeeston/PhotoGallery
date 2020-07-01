import React, { FC } from 'react';
import Routes from 'components/Routes';
import { LoginContextProvider } from 'contexts/LoginContext';

const App: FC = () => (
  <LoginContextProvider>
    <div className="min-h-screen bg-gradient-b-teal-100">
      <Routes />
    </div>
  </LoginContextProvider>
);

export default App;
