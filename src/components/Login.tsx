import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import useLogin from 'hooks/useLogin';
import StatusMessage from 'components/UI/StatusMessage';

const Login: FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    logIn,
    status,
  } = useLogin();

  return (
    <form
      onSubmit={logIn}
      className="flex flex-col p-8 m-8 bg-gray-400 rounded-lg shadow-xl flex-center"
    >
      <div className="w-full md:w-2/3 lg:w-1/2">
        {status && <StatusMessage status={status} />}
        <fieldset>
          <label htmlFor="username" className="flex flex-col p-2 m-2 text-xl">
            Username
            <input
              id="username"
              type="text"
              name="username"
              className="px-3 py-2 text-xl leading-tight text-gray-700 bg-white border rounded shadow appearance-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col p-2 m-2 text-xl">
            Password
            <input
              id="password"
              type="password"
              name="password"
              className="px-3 py-2 text-xl leading-tight text-gray-700 bg-white border rounded shadow appearance-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </fieldset>
        <div className="flex justify-between w-full md:px-4">
          <button
            type="submit"
            className="px-8 py-2 bg-green-200 border rounded shadow"
          >
            Log In
          </button>
          <Link to="/" className="px-8 py-2 bg-red-200 border rounded shadow">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
