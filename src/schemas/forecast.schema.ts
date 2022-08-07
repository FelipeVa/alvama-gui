import { array, number, object, string } from 'yup';

const ensureNumber = (val: any) => (isFinite(val) ? val : undefined);

export const createForecastSchema = object().shape({
  name: string().required(),
  items: array()
    .of(
      object().shape({
        name: string().required(),
        value: number().moreThan(0).required().transform(ensureNumber),
      }),
    )
    .min(4),
});
