import { datasets } from '@/api/datasets';
import { executions } from '@/api/executions';
import { results } from '@/api/results';

export const wrap = () => ({
  query: {
    getDatasets: datasets.getDatasets,
    getDataset: datasets.getDataset,
    getExecutions: executions.getExecutions,
    getResults: results.getResults,
    getResult: results.getResult,
  },
  mutation: {
    destroyDataset: datasets.deleteDataset,
    createDataset: datasets.createDataset,
    createExecution: executions.createExecution,
  },
});
