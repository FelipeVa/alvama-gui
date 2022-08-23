import { object, string } from 'yup';

export const loginSchema = object().shape({
  email: string().required(),
  password: string().required(),
});
