import React from 'react';
import { Outlet } from 'react-router-dom';
import BasicLayout from '@/components/layouts/BasicLayout';

const AuthLayout = () => {
  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  );
};

export default AuthLayout;
