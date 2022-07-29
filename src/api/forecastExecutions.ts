import api from '@/utils/fetcher';
import {
  CreateForecastFormValues,
  ForecastExecutionType,
} from '@/types/execution.type';

export const forecastExecutions = {
  getExecutions: async (): Promise<ForecastExecutionType[]> => {
    return (await api.get('forecasts/executions')).data;
  },

  createExecution: async (
    execution: CreateForecastFormValues,
  ): Promise<ForecastExecutionType> => {
    return (await api.post('forecasts/executions', execution)).data;
  },
};
