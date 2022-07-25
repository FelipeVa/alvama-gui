import { BusCapacityType, BusType, RouteType } from '@/types/dataset.type';
import { ExecutionType } from '@/types/execution.type';

export type ResultItemType = {
  bus: BusType;
  route: RouteType;
  bus_capacity: BusCapacityType;
  value: string;
};

export type ResultType = {
  id: string;
  objective: number;
  status: string;
  time: number;
  execution: ExecutionType;
  result_items: ResultItemType[];
  created_at: string;
};
