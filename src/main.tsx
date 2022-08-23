import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouteProvider } from '@/providers';
import { HashRouter } from 'react-router-dom';
// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <RouteProvider />
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
