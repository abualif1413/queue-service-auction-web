import { FC } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { DashboardContextProvider } from '../context';
import { Dashboard } from './dashboard';
import { DashboardLayout } from './dashboard-layout';
import { MyItems, MyItemsAdd } from './items';
import { Login } from './login';
import { RegisterUser } from './register';

export const AppRouter: FC = () => {
  return (
    <DashboardContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='/my-items' element={<MyItems />} />
            <Route path='/my-items/add' element={<MyItemsAdd />} />
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
