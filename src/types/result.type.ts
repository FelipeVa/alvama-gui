import {
  BusCapacityType,
  BusType,
  DatasetType,
  RouteType,
} from '@/types/dataset.type';
import { ExecutionType } from '@/types/execution.type';

export type ResultItemType = {
  bus: BusType;
  route: RouteType;
  capacity: BusCapacityType;
  value: string;
};

export type ResultType = {
  id: string;
  objective: number;
  status: string;
  time: number;
  dataset: DatasetType & {
    _count: {
      buses: number;
    };
  };
  execution: ExecutionType;
  result_items: ResultItemType[];
  created_at: string;
};
