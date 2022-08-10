import { datasets } from '@/api/datasets';
import { datasetExecutions } from '@/api/datasetExecutions';
import { datasetResults } from '@/api/datasetResults';
import { forecasts } from '@/api/forecasts';
import { forecastExecutions } from '@/api/forecastExecutions';
import { forecastResults } from '@/api/forecastResults';
import { dashboard } from '@/api/dashboard';

export const wrap = () => ({
  query: {
    getDatasets: datasets.getDatasets,
    getDataset: datasets.getDataset,
    getExecutions: datasetExecutions.getExecutions,
    getDatasetResults: datasetResults.getResults,
    getDatasetResult: datasetResults.getResult,
    getForecasts: forecasts.getForecasts,
    getForecast: forecasts.getForecast,
    getForecastExecutions: forecastExecutions.getExecutions,
    getForecastResults: forecastResults.getResults,
    getForecastResult: forecastResults.getResult,
    getDatasetResultStats: dashboard.getDatasetResultStats,
    getLastTenResults: dashboard.getLastTenResults,
  },
  mutation: {
    destroyDataset: datasets.deleteDataset,
    createDataset: datasets.createDataset,
    createDatasetExecution: datasetExecutions.createExecution,
    createForecastExecution: forecastExecutions.createExecution,
    createForecast: forecasts.createForecast,
    destroyForecast: forecasts.deleteForecast,
  },
});
