import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserResponseSuccessMetadata } from '../interfaces';
import { APP_KEYS, browserStorage } from '../utils';
import { useAlertModals } from './modals';

export const useUserAuth = () => {
  const { confirmationModal } = useAlertModals();
  const navigate = useNavigate();

  const userData = useMemo(() => {
    const userInfoFromLS = browserStorage.getLocalStorage<UserResponseSuccessMetadata>(
      APP_KEYS.USER_SESSION
    );
    const userInfoFromSS = browserStorage.getSessionStorage<UserResponseSuccessMetadata>(
      APP_KEYS.USER_SESSION
    );

    return userInfoFromLS ?? userInfoFromSS;
  }, []);

  const isLoggedIn = useMemo(() => {
    return userData !== null;
  }, [userData]);

  const logout: React.MouseEventHandler<HTMLLIElement> = () => {
    confirmationModal.setState({
      open: true,
      title: 'Logout confirmation',
      message: 'Are you sure want to logout from this app?',
      onConfirmYesAction: () => {
        browserStorage.removeLocalStorage(APP_KEYS.USER_SESSION);
        browserStorage.removeSessionStorage(APP_KEYS.USER_SESSION);
        confirmationModal.close();
        navigate('/user/login');
      },
      onConfirmNoAction: confirmationModal.close,
    });
  };

  const navigateToLogin = () => {
    document.location.href = '/user/login';
  };

  const navigateToDashboard = () => {
    document.location.href = '/';
  };

  return {
    confirmationModal,
    isLoggedIn,
    logout,
    navigateToDashboard,
    navigateToLogin,
    userData,
  };
};
