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

export type ForecastResultType = {
  id: string;
  method: string;
  mean_squared_error: number;
  time: number;
  value: number;
  execution: ForecastExecutionType;
  forecast: ForecastType;
  created_at: string;
};

// "method": "Moving Average",
//         "value": 4495,
//         "mean_squared_error": 84862.09777777773,
//         "time": 0.0108,
