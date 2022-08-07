import { DatasetType } from '@/types/dataset.type';
import { DatasetResultType, ForecastResultType } from '@/types/result.type';
import { ForecastType } from '@/types/forecast.type';

export type DatasetExecutionType = {
  id: string;
  name: string;
  dataset: DatasetType;
  result: DatasetResultType;
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
  result: ForecastResultType;
  created_at: string;
};

export interface CreateForecastFormValues {
  name: string;
  forecast_id: string;
}
