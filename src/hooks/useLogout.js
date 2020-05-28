import { useHistory } from 'react-router-dom';

const useLogout = () => {
  const history = useHistory();

  const logout = async () => {
    await fetch('/auth/logout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    localStorage.setItem('accessToken', '');

    history.push('/');
    window.location.reload(false);
  };

  return { logout };
};

export default useLogout;
