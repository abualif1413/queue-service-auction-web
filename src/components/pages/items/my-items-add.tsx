/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField } from '@mui/material';
import { ReactNode, useContext, useEffect } from 'react';
import { useSubmitHandlerMyItems } from '../../../hooks';
import { DashboardContext } from '../../context';
import { ConfirmationModal, ToastMessage } from '../../modals';

export const MyItemsAdd = () => {
  const { formik, confirmationModal, toastMessage } = useSubmitHandlerMyItems();
  const { dashboardTitle, dashboardBreadcrumb } = useContext(DashboardContext);
  useEffect(() => {
    const breadcrumbData = [
      { text: 'Dashboard', href: '/' },
      { text: 'My items', href: '/my-items' },
      { text: 'Add new item' },
    ];
    dashboardBreadcrumb.set(breadcrumbData);
    dashboardTitle.set('Add New Item');
  }, []);
  return (
    <div className='w-full h-auto'>
      <form className='w-1/3' onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='outlined-basic'
          label='Item Name'
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
          label='Price'
          variant='filled'
          margin='normal'
          name='price'
          inputMode='numeric'
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
          fullWidth
          id='outlined-basic'
          label='Time window'
          variant='filled'
          margin='normal'
          name='timeWindow'
          type='datetime-local'
          placeholder=''
          value={formik.values.timeWindow}
          onChange={formik.handleChange}
          error={formik.touched.timeWindow && Boolean(formik.errors.timeWindow)}
          helperText={formik.touched.timeWindow && (formik.errors.timeWindow as ReactNode)}
        />
        <div className='mb-6'></div>
        <Button variant='contained' type='submit'>
          Add item
        </Button>
      </form>
      <ConfirmationModal
        open={confirmationModal.open}
        title={confirmationModal.title}
        message={confirmationModal.message}
        onConfirmYesAction={confirmationModal.onConfirmYesAction}
        onConfirmNoAction={confirmationModal.onConfirmNoAction}
      />
      <ToastMessage
        open={toastMessage.open}
        message={toastMessage.message}
        severity={toastMessage.severity}
        onClose={toastMessage.onClose}
      />
    </div>
  );
};
