import api from '@/utils/fetcher';
import { DatasetResultType } from '@/types/result.type';

export const datasetResults = {
  getResults: async (): Promise<DatasetResultType[]> => {
    return (await api.get('datasets/results')).data;
  },
  getResult: async (id: string | number): Promise<DatasetResultType> => {
    return (await api.get(`datasets/results/${id}`)).data;
  },
};
