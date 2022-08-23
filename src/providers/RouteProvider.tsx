import React, { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import IndexDataset from '@/pages/datasets/home';
import CreateDataset from '@/pages/datasets/create';
import IndexDatasetExecution from '@/pages/datasets/executions/home';
import CreateDatasetExecution from '@/pages/datasets/executions/create';
import IndexDatasetResult from '@/pages/datasets/results/home';
import ShowDatasetResult from '@/pages/datasets/results/show';
import ShowDataset from '@/pages/datasets/show';
import IndexForecast from '@/pages/forecasts/home';
import CreateForecast from '@/pages/forecasts/create';
import IndexForecastExecution from '@/pages/forecasts/executions/home';
import CreateForecastExecution from '@/pages/forecasts/executions/create';
import IndexForecastResult from '@/pages/forecasts/results/home';
import ShowForecastResult from '@/pages/forecasts/results/show';
import ShowForecast from '@/pages/forecasts/show';
import LoginPage from '@/pages/login';
import NotFound from '@/pages/NotFound';
import { ProtectedLayout, ProtectedPage } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout, GuestLayout } from '@/components/layouts';

const RouteProvider: FC = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={token ? <AuthLayout /> : <GuestLayout />}>
        <Route
          index
          element={
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="datasets" element={<ProtectedLayout />}>
          <Route index element={<IndexDataset />} />
          <Route path="create" element={<CreateDataset />} />

          <Route path="executions">
            <Route index element={<IndexDatasetExecution />} />
            <Route path="create" element={<CreateDatasetExecution />} />
          </Route>
          <Route path="results">
            <Route index element={<IndexDatasetResult />} />
            <Route path=":resultId" element={<ShowDatasetResult />} />
          </Route>

          <Route path=":datasetId" element={<ShowDataset />} />
        </Route>

        <Route path="forecasts" element={<ProtectedLayout />}>
          <Route index element={<IndexForecast />} />
          <Route path="create" element={<CreateForecast />} />

          <Route path="executions">
            <Route index element={<IndexForecastExecution />} />
            <Route path="create" element={<CreateForecastExecution />} />
          </Route>

          <Route path="results">
            <Route index element={<IndexForecastResult />} />
            <Route path=":resultId" element={<ShowForecastResult />} />
          </Route>

          <Route path=":forecastId" element={<ShowForecast />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default RouteProvider;
