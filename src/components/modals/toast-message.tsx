import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';
import { ToastMessageProps } from '../../interfaces';

export const ToastMessage: FC<ToastMessageProps> = ({
  open,
  severity,
  message,
  onClose = () => {},
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={() => onClose()}>
      <Alert severity={severity} sx={{ width: 'auto' }} onClose={() => onClose()}>
        {message}
      </Alert>
    </Snackbar>
  );
};
