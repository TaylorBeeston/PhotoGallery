import { useState, useEffect } from 'react';
import { authFetch } from 'helpers/request.helpers';

const useLoggedIn = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        const res = await authFetch('/auth/refreshToken');

        switch (res.status) {
          case 200: {
            const { accessToken } = await res.json();
            setLoggedIn(true);
            localStorage.setItem('accessToken', accessToken);
            break;
          }
          case 401: {
            console.log(res);
            setLoggedIn(false);
            break;
          }
          case 500: {
            console.log(res);
            setTimeout(getLoggedIn, 1000);
            break;
          }
          default: {
            console.log(res);
            setLoggedIn(false);
          }
        }
      } catch (error) {
        console.log(error);
        setLoggedIn(false);
      }
    };

    if (localStorage.getItem('accessToken')) getLoggedIn();
  });

  return { isLoggedIn };
};

export default useLoggedIn;
