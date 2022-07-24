import api from '@/utils/fetcher';
import {
  CreateExecutionFormValues,
  ExecutionType,
} from '@/types/execution.type';

export const executions = {
  getExecutions: async (): Promise<ExecutionType[]> => {
    return (await api.get('/executions')).data;
  },

  createExecution: async (
    execution: CreateExecutionFormValues,
  ): Promise<ExecutionType> => {
    return (await api.post('/executions', execution)).data;
  },
};
