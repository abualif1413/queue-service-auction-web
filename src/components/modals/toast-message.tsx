import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';

export interface ToastMessageProps {
  open: boolean;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

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
