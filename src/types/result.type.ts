import {
  BusCapacityType,
  BusType,
  DatasetType,
  RouteType,
} from '@/types/dataset.type';
import {
  DatasetExecutionType,
  ForecastExecutionType,
} from '@/types/execution.type';
import { ForecastType } from '@/types/forecast.type';

export type DatasetResultItemType = {
  bus: BusType;
  route: RouteType;
  capacity: BusCapacityType;
  value: string;
};

export type DatasetResultType = {
  id: string;
  objective: number;
  status: string;
  time: number;
  dataset: DatasetType & {
    _count: {
      buses: number;
    };
  };
  execution: DatasetExecutionType;
  result_items: DatasetResultItemType[];
  created_at: string;
};

export type ForecastResultItemType = {
  method: string;
  mean_squared_error: number;
  value: number;
  selected: boolean;
};

export type ForecastResultType = {
  id: string;
  time: number;
  execution: ForecastExecutionType;
  forecast: ForecastType;
  result_items: ForecastResultItemType[];
  created_at: string;
};
