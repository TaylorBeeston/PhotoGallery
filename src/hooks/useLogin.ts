import { useState, FormEventHandler } from 'react';
import { useHistory } from 'react-router-dom';

type LoginValues = {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  logIn: FormEventHandler;
  status: string;
};

const useLogin = (): LoginValues => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const history = useHistory();

  const logIn: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setStatus('Logging In');
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
      setStatus('Log in failed');
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    logIn,
    status,
  } as const;
};

export default useLogin;
