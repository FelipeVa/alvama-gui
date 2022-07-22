export type RouteType = {
  label: string;
  length: string;
  demand: string;
  cycle_time: string;
};

export type BusCapacityType = {
  capacity: string;
  available: string;
};

export type BusCostType = {
  per_km: string;
};

export type BusType = {
  brand: string;
  capacities: BusCapacityType[];
  costs: BusCostType;
};

export type DatasetType = {
  id: number;
  name: string;
  buses: BusType[];
  routes: RouteType[];
  created_at: string;
};

export interface CreateDatasetFormValues
  extends Omit<DatasetType, 'id' | 'created_at'> {}
