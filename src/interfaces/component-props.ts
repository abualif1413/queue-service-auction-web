import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ColumnDef } from '@tanstack/react-table';
import { Item } from './items';

export interface BidsModalProps {
  open: boolean;
  item: Item;
  onClose: () => void
}

export interface BreadcrumbNavigationProps {
  data: LinkNavigationProps[];
}

export interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirmYesAction: () => void;
  onConfirmNoAction?: () => void;
}

export interface DashboardContextProps {
  dashboardTitle: {
    get: string;
    set: (value: string) => void;
  };
  dashboardBreadcrumb: {
    get: LinkNavigationProps[];
    set: (value: LinkNavigationProps[]) => void;
  };
}

export interface DashboardContextProviderProps {
  children: string | JSX.Element | JSX.Element[];
}

export interface LinkNavigationProps {
  text: string;
  href?: string;
}

interface MenuListItemBaseProps {
  caption: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

type MenuListItemConditionalProps = {
  linkTo?: string;
  onClick?: never
} | {
  onClick?: React.MouseEventHandler
  linkTo?: never
}


export type MenuListItemProps = MenuListItemBaseProps & MenuListItemConditionalProps

export interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export interface ToastMessageProps {
  open: boolean;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}
