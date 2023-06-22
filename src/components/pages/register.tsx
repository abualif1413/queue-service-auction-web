import { Button, Card, Link, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSubmitHandlerUserRegistration } from '../../hooks';
import { ConfirmationModal, ToastMessage } from '../modals';

export const RegisterUser: FC = () => {
  const { formik, confirmationModalState, toastMessageState } = useSubmitHandlerUserRegistration();
  const {
    open: confirmOpen,
    title: confirmTitle,
    message: confirmMessage,
    onConfirmYesAction,
    onConfirmNoAction,
  } = confirmationModalState;
  const {
    open: toastOpen,
    message: toastContent,
    severity: toastSeverity,
    onClose: toastOnclose,
  } = toastMessageState;

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <form onSubmit={formik.handleSubmit}>
        <Card variant='outlined' className='w-[400px] p-5'>
          <Typography variant='h5' textAlign='center'>
            Create your account
          </Typography>
          <div className='mb-4'></div>
          <TextField
            fullWidth
            id='outlined-basic'
            label='Name'
            variant='filled'
            margin='normal'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
            name='password1'
            value={formik.values.password1}
            onChange={formik.handleChange}
            error={formik.touched.password1 && Boolean(formik.errors.password1)}
            helperText={formik.touched.password1 && formik.errors.password1}
          />
          <TextField
            fullWidth
            id='outlined-basic'
            label='Re-type Password'
            variant='filled'
            type='password'
            margin='normal'
            name='password2'
            value={formik.values.password2}
            onChange={formik.handleChange}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />
          <div className='flex justify-end'>
            <RouterLink to='/user/login'>
              <Link underline='hover'>Back to login page</Link>
            </RouterLink>
          </div>
          <div className='mb-6'></div>
          <Button variant='contained' fullWidth type='submit'>
            Register account
          </Button>
        </Card>
      </form>
      <ConfirmationModal
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onConfirmYesAction={onConfirmYesAction}
        onConfirmNoAction={onConfirmNoAction}
      />
      <ToastMessage
        open={toastOpen}
        message={toastContent}
        severity={toastSeverity}
        onClose={toastOnclose}
      />
    </div>
  );
};
