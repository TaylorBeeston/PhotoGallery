import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoginContext } from 'contexts/LoginContext';

const ProtectedRoute = ({ component, path, exact = false, location }) => {
  const { isLoggedIn } = useContext(LoginContext);

  if (isLoggedIn)
    return <Route path={path} component={component} exact={exact} />;

  return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
};

export default ProtectedRoute;
