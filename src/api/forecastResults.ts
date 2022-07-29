import api from '@/utils/fetcher';
import { ForecastResultType } from '@/types/result.type';

export const forecastResults = {
  getResults: async (): Promise<ForecastResultType[]> => {
    return (await api.get('forecasts/results')).data;
  },
  getResult: async (id: string | number): Promise<ForecastResultType> => {
    return (await api.get(`forecasts/results/${id}`)).data;
  },
};
