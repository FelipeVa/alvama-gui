import { object, string } from 'yup';

export const createDatasetExecutionSchema = object().shape({
  name: string().required(),
  dataset_id: string().required(),
});

export const createForecastExecutionSchema = object().shape({
  name: string().required(),
  forecast_id: string().required(),
});
