import api from '@/utils/fetcher';
import { DatasetType } from '@/types/dataset.type';
import { CreateForecastFormValues, ForecastType } from '@/types/forecast.type';

export const forecasts = {
  getForecasts: async (): Promise<ForecastType[]> => {
    return (await api.get('/forecasts')).data;
  },

  deleteForecast: async (id: number | string): Promise<void> => {
    return (await api.delete(`/forecasts/${id}`)).data;
  },

  createForecast: async (
    forecast: CreateForecastFormValues,
  ): Promise<DatasetType> => {
    return (await api.post('/forecasts', forecast)).data;
  },

  getForecast: async (id: string): Promise<ForecastType> => {
    return (await api.get(`/forecasts/${id}`)).data;
  },
};
