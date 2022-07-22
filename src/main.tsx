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
              <Route path=":datasetId" element={<ShowDataset />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
