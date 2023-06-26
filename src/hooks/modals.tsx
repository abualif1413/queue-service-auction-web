import { useState } from 'react';
import { ConfirmationModalProps, ToastMessageProps } from '../interfaces';

export const useModals = () => {
  const confirmationModalProps: ConfirmationModalProps = {
    open: false,
    title: '',
    message: '',
    onConfirmYesAction: () => {},
  };
  const toastMessageProps: ToastMessageProps = {
    open: false,
    severity: 'info',
    message: '',
  };
  const [confirmationModalState, setConfirmationModalState] =
    useState<ConfirmationModalProps>(confirmationModalProps);
  const [toastMessageState, setToastMessageState] = useState<ToastMessageProps>(toastMessageProps);

  const confirmationModal = {
    getState: confirmationModalState,
    setState: (state: ConfirmationModalProps) => {
      setConfirmationModalState(state);
    },
    close: () => {
      setConfirmationModalState((prevstate) => ({ ...prevstate, open: false }));
    },
  };
  const toastMessage = {
    getState: toastMessageState,
    setState: (state: ToastMessageProps) => {
      setToastMessageState(state);
    },
    close: () => {
      setToastMessageState((prevstate) => ({ ...prevstate, open: false }));
    },
  };

  return {
    confirmationModal,
    toastMessage,
  };
};
