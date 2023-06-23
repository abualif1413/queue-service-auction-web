import { FC } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Dashboard } from './dashboard';
import { DashboardLayout } from './dashboard-layout';
import { Login } from './login';
import { MyItems } from './my-items';
import { RegisterUser } from './register';

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/my-items' element={<MyItems />} />
        </Route>
        <Route path='/user' element={<Outlet />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<RegisterUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
