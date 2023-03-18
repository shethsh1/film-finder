import * as yup from 'yup';

const schema = {
  login: yup.object().shape({
    email: yup.string().email().required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  }),
};

export default schema;
