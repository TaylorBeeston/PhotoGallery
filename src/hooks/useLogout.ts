import { authFetch } from 'helpers/request.helpers';

const useLogout = (): { logout: () => Promise<void> } => {
  const logout = async (): Promise<void> => {
    await authFetch('/auth/logout');
    localStorage.setItem('accessToken', '');
    window.location.reload(false);
  };

  return { logout };
};

export default useLogout;
