import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PhotoUploader from './PhotoUploader';
import Photos from './Photos';
import Header from './Header';
import Login from './Login';

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/upload" component={PhotoUploader} />
        <Route exact path="/" component={Photos} />
      </Switch>
    </Router>
  );
};

export default Routes;
