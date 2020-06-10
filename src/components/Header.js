import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useLoggedIn from '../hooks/useLoggedIn';
import useLogout from '../hooks/useLogout';

const Header = () => {
  const { isLoggedIn } = useLoggedIn();
  const { logout } = useLogout();
  const location = useLocation();

  return (
    <header className="flex justify-between p-5 border-b bg-gradient-t-gray-400">
      <Link to="/">
        <h1 className="font-title text-4xl subpixel-antialiased font-light tracking-wider bg-radial-green-300 px-4 py-2">
          The Beeston Kids
        </h1>
      </Link>
      <div className="flex">
        {location.pathname !== '/upload' && location.pathname !== '/login' && (
          <Link to={isLoggedIn ? '/upload' : '/login'} className="link">
            {isLoggedIn ? 'Upload Photos' : 'Log In'}
          </Link>
        )}
        {isLoggedIn && (
          <button type="button" className="link" onClick={() => logout()}>
            Log out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
