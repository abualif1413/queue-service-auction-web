import { useFormik } from 'formik';
import { AddNewUserRequest, BasicResponse, ConfirmationModalProps } from '../../interfaces';
import {
  HTTP_REQUEST_ENDPOINT,
  HTTP_REQUEST_METHOD,
  serviceHit,
  validationSchemaUserRegisterNew,
} from '../../utils';
import { useAlertModals } from '../modals';

export const useSubmitHandlerUserRegistration = () => {
  const { confirmationModal, toastMessage } = useAlertModals();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password1: '',
      password2: '',
    },
    validationSchema: validationSchemaUserRegisterNew,
    onSubmit: async (values) => {
      const confirmModalProps: ConfirmationModalProps = {
        open: true,
        title: 'Register account',
        message: 'By clicking yes button, you are agree to create you account with us',
        onConfirmYesAction: async () => {
          const response = await serviceHit<AddNewUserRequest, BasicResponse<any>>(
            HTTP_REQUEST_ENDPOINT.USER_REGISTER_NEW,
            HTTP_REQUEST_METHOD.POST,
            {
              email: values.email,
              name: values.name,
              password: values.password1,
            }
          );
          confirmationModal.close();
          if (response.success) {
            toastMessage.setState({
              open: true,
              message: response.message,
              severity: 'success',
              onClose: () => {
                toastMessage.close();
              },
            });
            formik.resetForm();
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
        onConfirmNoAction: () => {
          confirmationModal.close();
        },
      };
      confirmationModal.setState(confirmModalProps);
    },
  });

  return {
    formik,
    confirmationModalState: confirmationModal.getState,
    toastMessageState: toastMessage.getState,
  };
};
