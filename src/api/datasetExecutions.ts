import api from '@/utils/fetcher';
import {
  CreateExecutionFormValues,
  ExecutionType,
} from '@/types/execution.type';

export const datasetExecutions = {
  getExecutions: async (): Promise<ExecutionType[]> => {
    return (await api.get('datasets/executions')).data;
  },

  createExecution: async (
    execution: CreateExecutionFormValues,
  ): Promise<ExecutionType> => {
    return (await api.post('datasets/executions', execution)).data;
  },
};
