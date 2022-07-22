import { datasets } from '@/api/datasets';

export const wrap = () => ({
  query: {
    getDatasets: datasets.getDatasets,
    getDataset: datasets.getDataset,
  },
  mutation: {
    destroyDataset: datasets.deleteDataset,
    createDataset: datasets.createDataset,
  },
});
