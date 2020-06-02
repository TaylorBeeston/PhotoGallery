import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useLoggedIn from '../hooks/useLoggedIn';
import useLogout from '../hooks/useLogout';

const Header = () => {
  const { isLoggedIn } = useLoggedIn();
  const { logout } = useLogout();
  const location = useLocation();

  return (
    <header className="flex justify-between p-5 bg-gray-400 border-b">
      <Link to="/">
        <h1 className="font-title text-4xl subpixel-antialiased font-light tracking-wider bg-green-200 btn">
          The Beeston Kids
        </h1>
      </Link>
      {location.pathname !== '/upload' && location.pathname !== '/login' && (
        <Link
          to={isLoggedIn ? '/upload' : '/login'}
          className="text-gray-800 bg-gray-300 btn"
        >
          {isLoggedIn ? 'Upload Photos' : 'Log In'}
        </Link>
      )}
      {isLoggedIn && (
        <button
          type="button"
          className="text-gray-800 bg-gray-300 btn"
          onClick={() => logout()}
        >
          Log out
        </button>
      )}
    </header>
  );
};

export default Header;
