import { useState, useEffect } from 'react';

const useLoggedIn = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        const res = await fetch('/auth/refreshToken', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (res.status === 200) {
          const { accessToken } = await res.json();
          setLoggedIn(true);
          localStorage.setItem('accessToken', accessToken);
        } else if (res.status === 500) setTimeout(getLoggedIn, 1000);
      } catch (error) {
        console.log(error);
        setLoggedIn(false);
      }
    };

    if (localStorage.getItem('accessToken')) getLoggedIn();
  }, []);

  return { isLoggedIn };
};

export default useLoggedIn;
