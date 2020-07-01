import React, { FC, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLogin } from 'contexts/LoginContext';

const Header: FC = () => {
  const { isLoggedIn, logout } = useLogin();
  let links: ReactNode;

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
        <h1 className="px-4 py-2 text-4xl subpixel-antialiased font-light tracking-wider font-title bg-radial-green-300">
          The Beeston Kids
        </h1>
      </Link>
      <div className="flex">{links}</div>
    </header>
  );
};

export default Header;
