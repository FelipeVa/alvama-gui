import { BusType, RouteType } from '@/types/model.type';

export type DatasetType = {
  id: number;
  name: string;
  buses: BusType[];
  routes: RouteType[];
  created_at: string;
};
