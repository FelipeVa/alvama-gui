import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'styles/index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import IndexDataset from '@/pages/datasets/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFound from '@/pages/NotFound';
import CreateDataset from '@/pages/datasets/create';
import ShowDataset from '@/pages/datasets/show';
import IndexDatasetExecution from '@/pages/datasets/executions/home';
import CreateDatasetExecution from '@/pages/datasets/executions/create';
import IndexDatasetResult from '@/pages/datasets/results/home';
import ShowDatasetResult from '@/pages/datasets/results/show';
import IndexForecast from '@/pages/forecasts/home';
import CreateForecast from '@/pages/forecasts/create';
import ShowForecast from '@/pages/forecasts/show';
import CreateForecastExecution from '@/pages/forecasts/executions/create';
import IndexForecastExecution from '@/pages/forecasts/executions/home';
import IndexForecastResult from '@/pages/forecasts/results/home';
import ShowForecastResult from '@/pages/forecasts/results/show';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="datasets">
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

            <Route path="forecasts">
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
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
