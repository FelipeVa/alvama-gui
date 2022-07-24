export type RouteType = {
  id: number;
  name: string;
  length: string;
  demand: string;
  cycle_time: string;
  created_at: string;
};

export type BusCapacityType = {
  id: number;
  capacity: string;
  available: string;
  created_at: string;
};

export type BusType = {
  id: number;
  brand: string;
  capacities: BusCapacityType[];
  cost_per_km: string;
  created_at: string;
};

export type DatasetType = {
  id: number;
  name: string;
  buses: BusType[];
  routes: RouteType[];
  created_at: string;
};

export interface CreateDatasetFormValues extends Pick<DatasetType, 'name'> {
  buses: Omit<BusType, 'id' | 'created_at'>[];
  routes: Omit<RouteType, 'id' | 'created_at'>[];
}
