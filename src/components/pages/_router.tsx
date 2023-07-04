import { FC } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { DashboardContextProvider } from '../context';
import { Dashboard } from './dashboard';
import { DashboardLayout } from './dashboard-layout';
import { MyItems, MyItemsAdd } from './items';
import { Login } from './login';
import { RegisterUser } from './register';
import { BrowseItems } from './items/browse-items';
import { MyBids } from './items/my-bids';

export const AppRouter: FC = () => {
  return (
    <DashboardContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='/my-items' element={<MyItems />} />
            <Route path='/my-items/add' element={<MyItemsAdd />} />
            <Route path='/browse-items' element={<BrowseItems />} />
            <Route path='/my-bids' element={<MyBids />} />
          </Route>
          <Route path='/user' element={<Outlet />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<RegisterUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DashboardContextProvider>
  );
};
