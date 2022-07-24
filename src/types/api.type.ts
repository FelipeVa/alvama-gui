import { BusType, RouteType } from '@/types/dataset.type';

export type ResourceResponse<T> = T & {
  id: string;
  created_at: string;
};
