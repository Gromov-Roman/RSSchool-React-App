import { boolean, mixed, number, object, ObjectSchema, ref, string } from 'yup';
import { FormFieldsData } from '@models/data.model';

const MIN_PASSWORD_LENGTH = 8;
const MAX_FILE_SIZE = 1048576;

export const validationSchema: ObjectSchema<FormFieldsData> = object().shape({
  name: string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: number().positive('Age must be a positive number').required('Age is required'),
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .test('has-uppercase', 'Password must contain at least one uppercase letter', (value) => /[A-Z]/.test(value || ''))
    .test('has-lowercase', 'Password must contain at least one lowercase letter', (value) => /[a-z]/.test(value || ''))
    .test('has-number', 'Password must contain at least one number', (value) => /\d/.test(value || ''))
    .test('has-special', 'Password must contain at least one special character', (value) =>
      /[@$!%*?&]/.test(value || ''),
    )
    .min(MIN_PASSWORD_LENGTH, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: string().required('Gender is required'),
  termsAccepted: boolean().oneOf([true], 'Terms must be accepted'),
  picture: mixed<FileList>()
    .test('fileType', 'Unsupported File Format', (value) =>
      ['image/jpeg', 'image/png'].includes(value?.[0]?.type || ''),
    )
    .test('fileSize', 'File size must be less than 1MB', (value) => (value?.[0]?.size || 0) <= MAX_FILE_SIZE || false),
  country: string().required('Country is required'),
});
