import { boolean, mixed, number, object, ObjectSchema, ref, string, StringSchema } from 'yup';
import { FormFieldsData } from '@models/data.model';

const MIN_PASSWORD_LENGTH = 8;
const MAX_FILE_SIZE = 1048576;

export const passwordSchema: StringSchema<string> = string()
  .required('Password is required')
  .test('has-uppercase', 'Password must contain at least one uppercase letter', (value) => /[A-Z]/.test(value || ''))
  .test('has-lowercase', 'Password must contain at least one lowercase letter', (value) => /[a-z]/.test(value || ''))
  .test('has-number', 'Password must contain at least one number', (value) => /\d/.test(value || ''))
  .test('has-special', 'Password must contain at least one special character', (value) => /[@$!%*?&]/.test(value || ''))
  .min(MIN_PASSWORD_LENGTH, 'Password must be at least 8 characters long');

export const validationSchema: ObjectSchema<FormFieldsData> = object().shape({
  name: string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase'),
  age: number().required('Age is required').positive('Age must be a positive number'),
  email: string().required('Email is required').email('Invalid email'),
  password: passwordSchema,
  confirmPassword: string()
    .required('Confirm Password is required')
    .oneOf([ref('password')], 'Passwords must match'),
  gender: string().required('Gender is required'),
  termsAccepted: boolean().oneOf([true], 'Terms must be accepted'),
  picture: mixed<FileList>()
    .test('fileType', 'Unsupported File Format', (value) =>
      ['image/jpeg', 'image/png'].includes(value?.[0]?.type || ''),
    )
    .test('fileSize', 'File size must be less than 1MB', (value) => (value?.[0]?.size || 0) <= MAX_FILE_SIZE || false),
  country: string().required('Country is required'),
});
