import { createContext, FC, useState } from 'react';
import {
  DashboardContextProps,
  DashboardContextProviderProps,
  LinkNavigationProps,
} from '../../interfaces';

export const DashboardContext = createContext<DashboardContextProps>({
  dashboardTitle: {
    get: '',
    set: () => {},
  },
  dashboardBreadcrumb: {
    get: [],
    set: () => {},
  },
});
export const DashboardContextProvider: FC<DashboardContextProviderProps> = ({ children }) => {
  const [_dashboardTitle, _setDashboardTitle] = useState('');
  const [_dashboardBreadcrumb, _setDashboardBreadcrumb] = useState<LinkNavigationProps[]>([]);

  const onSetDashboardTitle = (value: string) => {
    _setDashboardTitle(value);
  };

  const onSetDashboardBreadcrumb = (value: LinkNavigationProps[]) => {
    _setDashboardBreadcrumb(value);
  };

  return (
    <DashboardContext.Provider
      value={{
        dashboardTitle: { get: _dashboardTitle, set: onSetDashboardTitle },
        dashboardBreadcrumb: { get: _dashboardBreadcrumb, set: onSetDashboardBreadcrumb },
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
