import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import BasicContainer from '@/components/layouts/BasicContainer';
import { Button, ButtonLink } from '@/components/form';
import {
  ArrowLeftIcon,
  CalendarIcon,
  HashtagIcon,
  MapIcon,
  TrashIcon,
  TruckIcon,
} from '@heroicons/react/outline';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import { useNotifier } from '@/hooks/useNotifier';
import { useQueryClient } from '@tanstack/react-query';
import { BusesTable, RoutesTable } from '@/pages/datasets/show/components';
import { BusCapacityType } from '@/types/dataset.type';
import { toCalendar } from '@/utils/common';

const ShowDataset = () => {
  const notifier = useNotifier();
  const params = useParams();
  const datasetId = params?.datasetId as string;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useTypeSafeQuery(['getDataset'], [datasetId], {
    enabled: !!datasetId,
  });

  const { mutate, isLoading } = useTypeSafeMutation('destroyDataset', {
    onSuccess: () => {
      notifier.notify({
        title: 'Dataset deleted',
        message: 'The dataset has been deleted successfully.',
      });
      navigate('/datasets');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getDatasets']);
    },
  });

  const onDestroyDataset = () => {
    mutate([datasetId]);
  };

  const busCapacities = useMemo(
    () => data?.buses.map(bus => bus.capacities).flat().length,
    [data],
  );

  const totalBusesAvailable = useMemo(() => {
    return data?.buses
      .map(bus =>
        bus.capacities
          .map((capacity: BusCapacityType) => capacity.available)
          .reduce((acc: number, curr: string) => acc + parseInt(curr), 0),
      )
      .reduce((acc: number, curr: number) => acc + curr, 0);
  }, [data]);

  return (
    <BasicContainer
      title={`Dataset - ${data?.name}`}
      isLoading={isLoading}
      actions={
        <div className="flex justify-end gap-2">
          <ButtonLink
            to="/datasets"
            className="bg-indigo-100 text-sm text-indigo-700"
            leftIcon={<ArrowLeftIcon className="mr-2 h-5 w-5" />}
          >
            Go back
          </ButtonLink>
          <Button
            className="bg-red-600 text-sm"
            onClick={onDestroyDataset}
            isLoading={isLoading}
            leftIcon={<TrashIcon className="mr-2 h-5 w-5" />}
          >
            Delete Dataset
          </Button>
        </div>
      }
      description={
        <>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <TruckIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {totalBusesAvailable ?? 0} Buses
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {data?.routes?.length} Routes
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <HashtagIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {busCapacities} Bus Capacities
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Created {toCalendar(data?.created_at as string)}
            </div>
          </div>
        </>
      }
    >
      {data ? (
        <div className="flex flex-col gap-8">
          <BusesTable buses={data.buses} />
          <RoutesTable routes={data.routes} />
        </div>
      ) : null}
    </BasicContainer>
  );
};

export default ShowDataset;
