import api from '@/utils/fetcher';
import { ModelFormValues } from '@/types/model.type';

export const createModel = async (data: ModelFormValues) => {
  const response = await api.post('/alvama', data);

  return response.data;
};
