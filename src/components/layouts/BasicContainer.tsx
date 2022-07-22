import React, { FC } from 'react';
import { LoadingOverlay } from '@/components';

interface BasicContainerPropsI {
  title: string;
  actions?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
}

const BasicContainer: FC<BasicContainerPropsI> = ({
  title,
  description,
  children,
  actions,
  isLoading,
}) => {
  return (
    <div className="space-y-8 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            {title}
          </h1>
          <>{description ? description : null}</>
        </div>
        <div>{actions}</div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isLoading ? <LoadingOverlay /> : null}
        {children}
      </div>
    </div>
  );
};

export default BasicContainer;
