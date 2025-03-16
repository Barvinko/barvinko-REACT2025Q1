import * as Yup from 'yup';
import { countries } from './countries';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .min(0, 'Age must be a positive number')
    .required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/,
      'Password is too weak'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  terms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
  picture: Yup.mixed<FileList>()
    .test(
      'fileSize',
      'File too large',
      (value) =>
        !value ||
        (value instanceof FileList &&
          value.length > 0 &&
          value[0].size <= 2 * 1024 * 1024)
    )
    .test(
      'fileType',
      'Unsupported file format',
      (value) =>
        !value ||
        (value instanceof FileList &&
          value.length > 0 &&
          ['image/jpeg', 'image/png'].includes(value[0].type))
    ),
  country: Yup.string()
    .oneOf(countries, 'Selected country is not valid')
    .required('Country is required'),
});
