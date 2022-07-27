import React from 'react';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import BasicContainer from '@/components/layouts/BasicContainer';
import { Button, ButtonLink } from '@/components/form';
import { PlusIcon, RefreshIcon } from '@heroicons/react/outline';
import { ForecastsTable } from '@/pages/forecasts/home/components';

const IndexForecast = () => {
  const { data, refetch, isRefetching, isLoading } = useTypeSafeQuery([
    'getForecasts',
  ]);
  const { mutate } = useTypeSafeMutation('destroyDataset', {
    onSuccess: () => refetch(),
  });

  const onDestroyDataset = (id: number) => {
    mutate([id]);
  };

  return (
    <BasicContainer
      title="Forecats"
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
            to="/forecasts/create"
            className="bg-indigo-600 text-sm"
            leftIcon={<PlusIcon className="mr-2 h-5 w-5" />}
          >
            Create Forecast
          </ButtonLink>
        </div>
      }
    >
      {data ? (
        <ForecastsTable data={data} onDestroy={onDestroyDataset} />
      ) : null}
    </BasicContainer>
  );
};

export default IndexForecast;
