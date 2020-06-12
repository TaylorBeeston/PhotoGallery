import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const history = useHistory();

  const logIn = async (e) => {
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
      console.log(error);
    }
  };

  return { username, setUsername, password, setPassword, logIn, status };
};

export default useLogin;
