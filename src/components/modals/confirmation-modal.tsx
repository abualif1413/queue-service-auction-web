import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FC } from 'react';

export interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirmYesAction: () => void;
  onConfirmNoAction?: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  title,
  message,
  onConfirmYesAction,
  onConfirmNoAction = () => {},
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onConfirmNoAction}>
          No
        </Button>
        <Button variant='contained' onClick={onConfirmYesAction}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
