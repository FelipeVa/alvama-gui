import { datasets } from '@/api/datasets';
import { datasetExecutions } from '@/api/datasetExecutions';
import { datasetResults } from '@/api/datasetResults';
import { forecasts } from '@/api/forecasts';

export const wrap = () => ({
  query: {
    getDatasets: datasets.getDatasets,
    getDataset: datasets.getDataset,
    getExecutions: datasetExecutions.getExecutions,
    getResults: datasetResults.getResults,
    getResult: datasetResults.getResult,
    getForecasts: forecasts.getForecasts,
  },
  mutation: {
    destroyDataset: datasets.deleteDataset,
    createDataset: datasets.createDataset,
    createExecution: datasetExecutions.createExecution,
  },
});
