import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LoginContext } from 'contexts/LoginContext';

const Header = () => {
  const { isLoggedIn, logout } = useContext(LoginContext);
  let links;

  if (isLoggedIn) {
    links = (
      <>
        <NavLink to="/upload" className="link" activeClassName="hidden">
          Upload Photos
        </NavLink>
        <button type="button" className="link" onClick={() => logout()}>
          Log out
        </button>
      </>
    );
  } else {
    links = (
      <NavLink to="/login" className="link" activeClassName="hidden">
        Log In
      </NavLink>
    );
  }

  return (
    <header className="flex justify-between p-5 border-b bg-gradient-t-gray-400">
      <Link to="/">
        <h1 className="font-title text-4xl subpixel-antialiased font-light tracking-wider bg-radial-green-300 px-4 py-2">
          The Beeston Kids
        </h1>
      </Link>
      <div className="flex">{links}</div>
    </header>
  );
};

export default Header;
