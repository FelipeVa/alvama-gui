import React from 'react';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import BasicContainer from '@/components/layouts/BasicContainer';
import { Button, ButtonLink } from '@/components/form';
import {
  CollectionIcon,
  PlusIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { ForecastsTable } from '@/pages/forecasts/home/components';
import { Empty } from '@/components';
import { useNavigate } from 'react-router-dom';

const IndexForecast = () => {
  const navigate = useNavigate();
  const { data, refetch, isRefetching, isLoading } = useTypeSafeQuery([
    'getForecasts',
  ]);
  const { mutate } = useTypeSafeMutation('destroyForecast', {
    onSuccess: () => refetch(),
  });

  const onDestroyDataset = (id: number) => {
    mutate([id]);
  };

  const onCreateForecast = () => {
    navigate('/forecasts/create');
  };

  return (
    <BasicContainer
      title="Forecasts"
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
      {data && data.length ? (
        <ForecastsTable data={data} onDestroy={onDestroyDataset} />
      ) : (
        <Empty
          title="Create a new forecast"
          onClick={onCreateForecast}
          icon={<CollectionIcon className="mx-auto h-12 w-12 text-gray-400" />}
        />
      )}
    </BasicContainer>
  );
};

export default IndexForecast;
