import { ColumnDef } from '@tanstack/react-table';

export interface LinkNavigationProps {
  text: string;
  href?: string;
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
