import { useFormik } from 'formik';
import {
  BasicResponse,
  LoginAtempt,
  UserResponseFailedMetadata,
  UserResponseSuccessMetadata,
} from '../../interfaces';
import {
  APP_KEYS,
  browserStorage,
  HTTP_REQUEST_ENDPOINT,
  HTTP_REQUEST_METHOD,
  serviceHit,
  validationSchemaLogin,
} from '../../utils';
import { useModals } from '../modals';
import { useUserAuth } from '../user-auth';

export const useSubmitHandlerLogin = () => {
  const { toastMessage } = useModals();
  const { navigateToDashboard } = useUserAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      keepLoggedIn: false,
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      const response = await serviceHit<
        LoginAtempt,
        BasicResponse<UserResponseSuccessMetadata | UserResponseFailedMetadata>
      >(HTTP_REQUEST_ENDPOINT.USER_LOGIN_ATTEMPT, HTTP_REQUEST_METHOD.POST, {
        email: values.email,
        password: values.password,
      });
      if (response.success) {
        if (values.keepLoggedIn) {
          browserStorage.setLocalStorage(
            APP_KEYS.USER_SESSION,
            response.metadata as UserResponseSuccessMetadata,
            604800000 // Life in 7 days
          );
        } else {
          browserStorage.setSessionStorage(
            APP_KEYS.USER_SESSION,
            response.metadata as UserResponseSuccessMetadata
          );
        }
        toastMessage.setState({
          open: true,
          message: 'Login success. Close this notification and we will redirect you to dashboard',
          severity: 'success',
          onClose: () => {
            toastMessage.close();
            navigateToDashboard();
          },
        });
      } else {
        toastMessage.setState({
          open: true,
          message: response.message,
          severity: 'error',
          onClose: () => {
            toastMessage.close();
          },
        });
      }
    },
  });

  return {
    formik,
    toastMessageState: toastMessage.getState,
  };
};
