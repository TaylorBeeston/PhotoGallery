import { useState, FormEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import { useStatus } from 'contexts/StatusContext';

type LoginValues = {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  logIn: FormEventHandler;
};

const useLogin = (): LoginValues => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setMessage, clearMessage } = useStatus();
  const history = useHistory();

  const logIn: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setMessage('Logging In');
      const res = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('accessToken', (await res.json()).accessToken);

      clearMessage();
      history.push('/');
      window.location.reload(false);
    } catch (error) {
      setMessage('Log in failed');
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    logIn,
  } as const;
};

export default useLogin;
