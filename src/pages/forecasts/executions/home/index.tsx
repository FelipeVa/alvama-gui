import React from 'react';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import BasicContainer from '@/components/layouts/BasicContainer';
import { Button, ButtonLink } from '@/components/form';
import { PlayIcon, PlusIcon, RefreshIcon } from '@heroicons/react/outline';
import { ExecutionsTable } from '@/pages/forecasts/executions/home/components';
import { Empty } from '@/components';
import { useNavigate } from 'react-router-dom';

const IndexForecastExecution = () => {
  const navigate = useNavigate();
  const { data, refetch, isRefetching, isLoading } = useTypeSafeQuery([
    'getForecastExecutions',
  ]);

  const onCreateExecution = () => {
    navigate('/datasets/executions/create');
  };

  return (
    <BasicContainer
      title="Executions"
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
            to="/forecasts/executions/create"
            className="bg-indigo-600 text-sm"
            leftIcon={<PlusIcon className="mr-2 h-5 w-5" />}
          >
            Create Execution
          </ButtonLink>
        </div>
      }
    >
      {data && data.length ? (
        <ExecutionsTable data={data} />
      ) : (
        <Empty
          title="Create a new execution"
          onClick={onCreateExecution}
          icon={<PlayIcon className="mx-auto h-12 w-12 text-gray-400" />}
        />
      )}
    </BasicContainer>
  );
};

export default IndexForecastExecution;
