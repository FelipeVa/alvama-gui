import { object, string } from 'yup';

export const createExecutionSchema = object().shape({
  name: string().required(),
  dataset_id: string().required(),
});
