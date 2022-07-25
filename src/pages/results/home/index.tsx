import React from 'react';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { Button, ButtonLink } from '@/components/form';
import { PlusIcon, RefreshIcon } from '@heroicons/react/outline';
import BasicContainer from '@/components/layouts/BasicContainer';
import { ResultsTable } from '@/pages/results/home/components';

const IndexResult = () => {
  const { data, refetch, isRefetching, isLoading } = useTypeSafeQuery([
    'getResults',
  ]);
  return (
    <BasicContainer
      title="Results"
      isLoading={isLoading}
      actions={
        <div className="flex justify-end space-x-2">
          <Button
            leftIcon={<RefreshIcon className="mr-2 h-5 w-5" />}
            className="bg-indigo-100 text-sm text-indigo-700"
            isLoading={isRefetching}
            onClick={() => refetch()}
          >
            Refresh
          </Button>

          <ButtonLink
            to="/executions/create"
            className="bg-indigo-600 text-sm"
            leftIcon={<PlusIcon className="mr-2 h-5 w-5" />}
          >
            Create Execution
          </ButtonLink>
        </div>
      }
    >
      {data ? <ResultsTable data={data} /> : null}
    </BasicContainer>
  );
};

export default IndexResult;
