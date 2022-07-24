import { datasets } from '@/api/datasets';
import { executions } from '@/api/executions';

export const wrap = () => ({
  query: {
    getDatasets: datasets.getDatasets,
    getDataset: datasets.getDataset,
    getExecutions: executions.getExecutions,
  },
  mutation: {
    destroyDataset: datasets.deleteDataset,
    createDataset: datasets.createDataset,
    createExecution: executions.createExecution,
  },
});
