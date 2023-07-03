import { useFormik } from 'formik';
import {
  BasicResponse,
  ConfirmationModalProps,
  NewItemRequest,
  NewItemResponseFailedMetadata,
  NewItemResponseSuccessMetadata,
} from '../../interfaces';
import {
  APP_KEYS,
  HTTP_REQUEST_ENDPOINT,
  HTTP_REQUEST_METHOD,
  serviceHit,
  validationSchemaMyItems,
} from '../../utils';
import { useUserAuth } from '../user-auth';
import { useAlertModals } from '../modals';

export const useSubmitHandlerMyItems = () => {
  const now = new Date();
  const { confirmationModal, toastMessage } = useAlertModals();
  const { userData } = useUserAuth();
  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      timeWindow: now,
    },
    validationSchema: validationSchemaMyItems,
    onSubmit: (values) => {
      const confirmationModalProps: ConfirmationModalProps = {
        open: true,
        title: 'New item confirmation',
        message: 'Are you sure want to add this item?',
        onConfirmYesAction: () => {
          void (async () => {
            const response = await serviceHit<
              NewItemRequest,
              BasicResponse<NewItemResponseSuccessMetadata | NewItemResponseFailedMetadata>
            >(
              HTTP_REQUEST_ENDPOINT.ADD_NEW_ITEM,
              HTTP_REQUEST_METHOD.POST,
              {
                name: values.name,
                price: values.price,
                timeWindow: values.timeWindow,
              },
              {
                [APP_KEYS.USER_AUTH_HEADER]: userData.authId,
              }
            );
            confirmationModal.close();
            formik.resetForm();
            if (response.success) {
              toastMessage.setState({
                open: true,
                message: response.message,
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
          })();
        },
        onConfirmNoAction: () => {
          confirmationModal.close();
        },
      };
      confirmationModal.setState(confirmationModalProps);
    },
  });

  return {
    formik,
    confirmationModal: confirmationModal.getState,
    toastMessage: toastMessage.getState,
  };
};
