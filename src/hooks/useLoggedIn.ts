import { useState, useEffect } from 'react';
import { authFetch } from 'helpers/request.helpers';

const useLoggedIn = (): { isLoggedIn: boolean } => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getLoggedIn = async (): Promise<void> => {
      try {
        const res = await authFetch('/auth/refreshToken');

        switch (res.status) {
          case 200: {
            const { accessToken } = await res.json();
            setLoggedIn(true);
            localStorage.setItem('accessToken', accessToken);
            break;
          }
          case 500: {
            setTimeout(getLoggedIn, 1000);
            break;
          }
          default: {
            setLoggedIn(false);
          }
        }
      } catch (error) {
        setLoggedIn(false);
      }
    };

    if (localStorage.getItem('accessToken')) getLoggedIn();
  });

  return { isLoggedIn };
};

export default useLoggedIn;
