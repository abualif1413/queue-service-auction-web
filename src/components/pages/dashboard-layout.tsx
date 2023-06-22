import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Outlet } from 'react-router-dom';
import { ConfirmationModal } from '../modals';
import { useUserAuth } from '../../hooks';

export const DashboardLayout = () => {
  const { confirmationModal, logout, isLoggedIn, navigateToLogin } = useUserAuth();
  if (!isLoggedIn) {
    navigateToLogin();
  }
  return (
    <div className='flex w-full h-screen'>
      <div className='w-1/4'>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary='My Items' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LabelImportantIcon />
              </ListItemIcon>
              <ListItemText primary='My Bids' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary='Account' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={logout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <div className='grow'>
        <Outlet />
      </div>
      <ConfirmationModal
        open={confirmationModal.getState.open}
        title={confirmationModal.getState.title}
        message={confirmationModal.getState.message}
        onConfirmYesAction={confirmationModal.getState.onConfirmYesAction}
        onConfirmNoAction={confirmationModal.getState.onConfirmNoAction}
      />
    </div>
  );
};
