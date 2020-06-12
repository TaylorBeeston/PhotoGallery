import { authFetch } from '../helpers/request.helpers';

const useLogout = () => {
  const logout = async () => {
    await authFetch('/auth/logout');
    localStorage.setItem('accessToken', '');
    window.location.reload(false);
  };

  return { logout };
};

export default useLogout;
