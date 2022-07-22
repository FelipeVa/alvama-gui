import React from 'react';
import { Outlet } from 'react-router-dom';
import BasicLayout from '@/components/layouts/BasicLayout';

const App: React.FC = () => {
  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  );
};

export default App;
