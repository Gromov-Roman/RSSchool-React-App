import { boolean, mixed, number, object, ref, string } from 'yup';

export const validationSchema = object().shape({
  name: string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: number().positive('Age must be a positive number').required('Age is required'),
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be strong')
    .required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: string().required('Gender is required'),
  termsAccepted: boolean().oneOf([true], 'Terms must be accepted'),
  picture: mixed().test(
    'fileType',
    'Unsupported File Format',
    (value) => value && ['image/jpeg', 'image/png'].includes((value as { type: string }).type),
  ),
  country: string().required('Country is required'),
});
