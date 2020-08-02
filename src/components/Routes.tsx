import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PhotoUploads from 'pages/PhotoUploads';
import PhotosIndex from 'pages/PhotosIndex';
import Header from 'components/Header';
import Login from 'pages/Login';
import ProtectedRoute from 'components/ProtectedRoute';

const Routes: FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/upload" component={PhotoUploads} />
        <Route exact path="/" component={PhotosIndex} />
      </Switch>
    </Router>
  );
};

export default Routes;
