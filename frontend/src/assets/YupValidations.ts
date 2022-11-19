import * as Yup from 'yup';

export const YupLogin = Yup.object({
  email: Yup.string().email('This email is invalid').required('User email is required'),

  password: Yup.string()
    .min(8, 'The password must have a minimum of 8 characters')
    .max(40, 'The password cannot be more than 40 characters')
    .required('User password is required'),
});
