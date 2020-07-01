import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PhotoUploader from 'components/Photos/PhotoUploader';
import Photos from 'components/Photos/Photos';
import Header from 'components/Header';
import Login from 'components/Login';
import ProtectedRoute from 'components/ProtectedRoute';
import { StatusContextProvider } from 'contexts/StatusContext';

const Routes: FC = () => {
  return (
    <Router>
      <StatusContextProvider>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/upload" component={PhotoUploader} />
          <Route exact path="/" component={Photos} />
        </Switch>
      </StatusContextProvider>
    </Router>
  );
};

export default Routes;
