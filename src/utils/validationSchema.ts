import * as yup from 'yup';

export const validationSchemaUserRegisterNew = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('This is not a valid email address').required('Email is required'),
  password1: yup.string().required('Please enter your password'),
  password2: yup.string().required('Please re-type your password'),
});

export const validationSchemaLogin = yup.object({
  email: yup.string().email('This is not a valid email address').required('Email is required'),
  password: yup.string().required('Please enter your password'),
});
