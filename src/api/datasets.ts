import api from '@/utils/fetcher';
import { CreateDatasetFormValues, DatasetType } from '@/types/dataset.type';

export const datasets = {
  getDatasets: async (): Promise<DatasetType[]> => {
    return (await api.get('/datasets')).data;
  },

  deleteDataset: async (id: number | string): Promise<void> => {
    return (await api.delete(`/datasets/${id}`)).data;
  },

  createDataset: async (
    dataset: CreateDatasetFormValues,
  ): Promise<DatasetType> => {
    return (await api.post('/datasets', dataset)).data;
  },

  getDataset: async (id: string): Promise<DatasetType> => {
    return (await api.get(`/datasets/${id}`)).data;
  },
};
