import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useLogin } from 'contexts/LoginContext';

const ProtectedRoute: FC<RouteProps> = ({ component, path, exact = false }) => {
  const { isLoggedIn } = useLogin();

  if (isLoggedIn)
    return <Route path={path} component={component} exact={exact} />;

  return <Redirect to={{ pathname: '/login' }} />;
};

export default ProtectedRoute;
