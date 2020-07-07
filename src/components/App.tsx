import React, { FC } from 'react';
import Routes from 'components/Routes';
import TopLevelProviders from 'providers/TopLevelProviders';

const App: FC = () => (
  <TopLevelProviders>
    <div className="min-h-screen fancy-bg">
      <Routes />
    </div>
  </TopLevelProviders>
);

export default App;
