import api from '@/utils/fetcher';
import { ResultType } from '@/types/result.type';

export const results = {
  getResults: async (): Promise<ResultType[]> => {
    return (await api.get('/results')).data;
  },
  getResult: async (id: string | number): Promise<ResultType> => {
    return (await api.get(`/results/${id}`)).data;
  },
};
