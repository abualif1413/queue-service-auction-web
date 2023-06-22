import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSubmitHandlerLogin, useUserAuth } from '../../hooks';
import { ToastMessage } from '../modals';

export const Login: FC = () => {
  const { formik, toastMessageState } = useSubmitHandlerLogin();
  const { isLoggedIn, navigateToDashboard } = useUserAuth();
  if (isLoggedIn) {
    navigateToDashboard();
  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <form onSubmit={formik.handleSubmit}>
        <Card variant='outlined' className='w-[400px] p-5'>
          <Typography variant='h5' textAlign='center'>
            Welcome, Please Log In!
          </Typography>
          <div className='mb-4'>&nbsp;</div>
          <TextField
            fullWidth
            id='outlined-basic'
            label='Email'
            variant='filled'
            margin='normal'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id='outlined-basic'
            label='Password'
            variant='filled'
            type='password'
            margin='normal'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <div className='flex justify-between'>
            <RouterLink to='/user/register'>
              <Link underline='hover'>Register</Link>
            </RouterLink>
            <Link underline='hover'>Forgot Password</Link>
          </div>
          <br />
          <Button fullWidth variant='contained' type='submit'>
            Log in
          </Button>
          <FormControlLabel
            control={<Checkbox checked={formik.values.keepLoggedIn} />}
            label='Keep me logged in'
            name='keepLoggedIn'
            onChange={formik.handleChange}
          />
        </Card>
      </form>
      <ToastMessage
        open={toastMessageState.open}
        severity={toastMessageState.severity}
        message={toastMessageState.message}
        onClose={toastMessageState.onClose}
      />
    </div>
  );
};
