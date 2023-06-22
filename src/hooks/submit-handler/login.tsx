import { useFormik } from 'formik';
import { BasicResponse, LoginAtempt } from '../../interfaces';
import {
  HTTP_REQUEST_ENDPOINT,
  HTTP_REQUEST_METHOD,
  serviceHit,
  validationSchemaLogin,
} from '../../utils';
import { useModals } from '../use-modals';

export const useSubmitHandlerLogin = () => {
  const { toastMessage } = useModals();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      const response = await serviceHit<LoginAtempt, BasicResponse>(
        HTTP_REQUEST_ENDPOINT.USER_LOGIN_ATTEMPT,
        HTTP_REQUEST_METHOD.POST,
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response.success) {
        toastMessage.setState({
          open: true,
          message: 'Login success. Redirecting you to dashboard',
          severity: 'success',
          onClose: () => {
            toastMessage.close();
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
