import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Login } from './login';
import { RegisterUser } from './register';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/user' element={<Outlet />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<RegisterUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
