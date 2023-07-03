import {
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { ConfirmationModal } from '../modals';
import { useUserAuth } from '../../hooks';
import { FC, useContext } from 'react';
import { BreadcrumbNavigationProps, MenuListItemProps } from '../../interfaces';
import { indigo } from '@mui/material/colors';
import { DashboardContext } from '../context';

export const DashboardLayout: FC = () => {
  const { confirmationModal, logout, isLoggedIn, navigateToLogin } = useUserAuth();
  const { dashboardTitle, dashboardBreadcrumb } = useContext(DashboardContext);
  if (!isLoggedIn) {
    navigateToLogin();
  }
  const listAreaBg = indigo[900];
  const listItemFg = indigo[50];
  const listItemHover = indigo[700];
  return (
    <div className='flex w-full h-screen'>
      <div className='w-[300px]' style={{ backgroundColor: listAreaBg }}>
        <List
          sx={{
            '& .MuiListItem-root, & .MuiSvgIcon-root': {
              color: listItemFg,
            },
            '& .MuiListItem-root:hover': {
              backgroundColor: listItemHover,
            },
          }}
        >
          <MenuItem linkTo='/my-items' caption='My Items' Icon={PostAddIcon} />
          <MenuItem
            linkTo='/browse-items'
            caption='Browse Items'
            Icon={FormatListNumberedRtlIcon}
          />
          <MenuItem linkTo='/browse-items' caption='My Bids' Icon={LabelImportantIcon} />
          <MenuItem linkTo='/browse-items' caption='My Balance' Icon={CurrencyExchangeIcon} />
          <MenuItem linkTo='/browse-items' caption='Account' Icon={AccountCircleIcon} />
          <MenuItem caption='Logout' Icon={LogoutIcon} onClick={logout} />
        </List>
      </div>
      <div className='grow'>
        <Paper className='p-4' square elevation={8}>
          <Typography variant='h3' sx={{ marginBottom: '10px' }}>
            {dashboardTitle.get}
          </Typography>
          <BreadcrumbNavigation data={dashboardBreadcrumb.get} />
        </Paper>
        <div className='p-4'>
          <Outlet />
        </div>
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

const MenuItem: FC<MenuListItemProps> = ({ linkTo, caption, Icon, onClick }) => {
  const item = (
    <ListItemButton>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{caption}</ListItemText>
    </ListItemButton>
  );
  return (
    <ListItem disablePadding onClick={onClick}>
      {onClick ? (
        item
      ) : (
        <RouterLink to={linkTo as string} className='w-full'>
          {item}
        </RouterLink>
      )}
    </ListItem>
  );
};

const BreadcrumbNavigation: FC<BreadcrumbNavigationProps> = ({ data }) => {
  const colorLink = indigo[500];
  const colorActive = indigo[200];
  return (
    <Breadcrumbs separator='>'>
      {data.map((_data, index) => {
        return _data.href ? (
          <RouterLink to={_data.href}>
            <Link component='span' underline='hover' color={colorLink}>
              {_data.text}
            </Link>
          </RouterLink>
        ) : (
          <Link component='span' underline='none' color={colorActive}>
            {_data.text}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
