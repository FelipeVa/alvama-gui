import api from '@/utils/fetcher';
import { ResultType } from '@/types/result.type';

export const datasetResults = {
  getResults: async (): Promise<ResultType[]> => {
    return (await api.get('datasets/results')).data;
  },
  getResult: async (id: string | number): Promise<ResultType> => {
    return (await api.get(`datasets/results/${id}`)).data;
  },
};
