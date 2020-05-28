import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('accessToken', (await res.json()).accessToken);

      history.push('/');
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col p-8 m-8 bg-gray-400 rounded-lg shadow-xl flex-center"
    >
      <div className="w-full md:w-2/3 lg:w-1/2">
        <label htmlFor="username" className="flex flex-col p-2 m-2 text-xl">
          Username
          <input
            id="username"
            type="text"
            name="username"
            className="px-3 py-2 text-xl leading-tight text-gray-700 bg-white border rounded shadow appearance-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
        </label>
        <div className="flex justify-between w-full md:px-4">
          <button
            type="submit"
            className="px-8 py-2 bg-green-200 border rounded shadow"
          >
            Log In
          </button>
          <Link to="/" className="bg-red-200 px-8 py-2 rounded border shadow">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
