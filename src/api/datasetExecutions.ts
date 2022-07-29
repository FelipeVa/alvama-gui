import api from '@/utils/fetcher';
import {
  CreateDatasetExecutionFormValues,
  DatasetExecutionType,
} from '@/types/execution.type';

export const datasetExecutions = {
  getExecutions: async (): Promise<DatasetExecutionType[]> => {
    return (await api.get('datasets/executions')).data;
  },

  createExecution: async (
    execution: CreateDatasetExecutionFormValues,
  ): Promise<DatasetExecutionType> => {
    return (await api.post('datasets/executions', execution)).data;
  },
};
