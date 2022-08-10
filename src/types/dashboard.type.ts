import { DatasetResultType, ForecastResultType } from '@/types/result.type';

export type DashboardDatasetResultStatsType = {
  result_id: number;
  status: string;
  name: string;
  objective: number;
  amount_of_buses: number;
  buses_to_be_used: number;
  demand_of_routes: number;
};

export type DashboardLastTenResultStatsType = {
  dataset_results: DatasetResultType[];
  forecast_results: ForecastResultType[];
};
