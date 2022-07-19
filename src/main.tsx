import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './samples/node-api'
import 'styles/index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
