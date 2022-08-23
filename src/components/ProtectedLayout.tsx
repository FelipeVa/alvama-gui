import React from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <ProtectedPage>
      <Outlet />
    </ProtectedPage>
  );
};

export default ProtectedLayout;
