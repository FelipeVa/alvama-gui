import { array, number, object, string } from 'yup';

const ensureNumber = (val: any) => (isFinite(val) ? val : undefined);

export const createDatasetSchema = object().shape({
  name: string().required(),
  routes: array().of(
    object().shape({
      label: string().required(),
      length: number().moreThan(0).required().transform(ensureNumber),
      demand: number().moreThan(0).required().transform(ensureNumber),
      cycle_time: number().moreThan(0).required().transform(ensureNumber),
    }),
  ),
  buses: array().of(
    object().shape({
      brand: string().required(),
      capacities: array().of(
        object().shape({
          capacity: number().moreThan(0).required().transform(ensureNumber),
          available: number().moreThan(0).required().transform(ensureNumber),
        }),
      ),
      cost_per_km: number().moreThan(0).required().transform(ensureNumber),
    }),
  ),
});
