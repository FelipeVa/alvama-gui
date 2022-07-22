import React from 'react';
import BasicContainer from '@/components/layouts/BasicContainer';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { PlusIcon, RefreshIcon } from '@heroicons/react/outline';
import { Button, ButtonLink } from '@/components/form';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import { DatasetsTable } from '@/pages/datasets/home/components';

const IndexDataset = () => {
  const { data, refetch, isRefetching, isLoading } = useTypeSafeQuery([
    'getDatasets',
  ]);
  const { mutate } = useTypeSafeMutation('destroyDataset', {
    onSuccess: () => refetch(),
  });

  const onDestroyDataset = (id: number) => {
    mutate([id]);
  };

  return (
    <BasicContainer
      title="Datasets"
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
            to="/datasets/create"
            className="bg-indigo-600 text-sm"
            leftIcon={<PlusIcon className="mr-2 h-5 w-5" />}
          >
            Create Dataset
          </ButtonLink>
        </div>
      }
    >
      {data ? <DatasetsTable data={data} onDestroy={onDestroyDataset} /> : null}
    </BasicContainer>
  );
};

export default IndexDataset;
