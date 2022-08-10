import api from '@/utils/fetcher';
import {
  DashboardDatasetResultStatsType,
  DashboardLastTenResultStatsType,
} from '@/types/dashboard.type';

export const dashboard = {
  getDatasetResultStats: async (
    id: string,
  ): Promise<DashboardDatasetResultStatsType> => {
    return (await api.get(`/dashboard/stats/dataset-result/${id}`)).data;
  },

  getLastTenResults: async (): Promise<DashboardLastTenResultStatsType> => {
    return (await api.get('/dashboard/stats/last-ten-results')).data;
  },
};
