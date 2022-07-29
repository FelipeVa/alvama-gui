import { DatasetType } from '@/types/dataset.type';
import { ResultType } from '@/types/result.type';
import { ForecastType } from '@/types/forecast.type';

export type DatasetExecutionType = {
  id: string;
  name: string;
  dataset: DatasetType;
  result: ResultType;
  created_at: string;
};

export interface CreateDatasetExecutionFormValues {
  name: string;
  dataset_id: string;
}

export type ForecastExecutionType = {
  id: string;
  name: string;
  forecast: ForecastType;
  result: ResultType;
  created_at: string;
};

export interface CreateForecastFormValues {
  name: string;
  forecast_id: string;
}
