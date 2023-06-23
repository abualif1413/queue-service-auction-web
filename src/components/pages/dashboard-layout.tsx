import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link, Outlet } from 'react-router-dom';
import { ConfirmationModal } from '../modals';
import { useUserAuth } from '../../hooks';
import { FC } from 'react';

export const DashboardLayout: FC = () => {
  const { confirmationModal, logout, isLoggedIn, navigateToLogin } = useUserAuth();
  if (!isLoggedIn) {
    navigateToLogin();
  }
  return (
    <div className='flex w-full h-screen'>
      <div className='w-1/4'>
        <List
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              Nested List Items
            </ListSubheader>
          }
        >
          <ListItem disablePadding>
            <Link to='/my-items'>
              <ListItemButton>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText>My Items</ListItemText>
              </ListItemButton>
            </Link>
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
                <CurrencyExchangeIcon />
              </ListItemIcon>
              <ListItemText primary='My Balance' />
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
