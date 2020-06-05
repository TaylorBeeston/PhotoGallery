import { useHistory } from 'react-router-dom';
import { authFetch } from '../helpers/request.helpers';

const useLogout = () => {
  const history = useHistory();

  const logout = async () => {
    await authFetch('/auth/logout');
    localStorage.setItem('accessToken', '');

    history.push('/');
    window.location.reload(false);
  };

  return { logout };
};

export default useLogout;
