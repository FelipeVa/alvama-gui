import React, { MouseEventHandler } from 'react';
import { CreateDatasetExecutionFormValues } from '@/types/execution.type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createDatasetExecutionSchema } from '@/schemas/execution.schema';
import { ButtonLink } from '@/components/form';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import BasicContainer from '@/components/layouts/BasicContainer';
import { CreateExecutionForm } from '@/pages/datasets/executions/create/components';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';

const initialValues: CreateDatasetExecutionFormValues = {
  name: '',
  dataset_id: '',
};

const CreateDatasetExecution = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: datasets, isLoading: isLoadingDatasets } = useTypeSafeQuery([
    'getDatasets',
  ]);
  const { mutate, isLoading } = useTypeSafeMutation('createDatasetExecution', {
    onSuccess: () => {
      navigate('/datasets/executions');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getExecutions']);
    },
  });
  const { control, handleSubmit, reset } =
    useForm<CreateDatasetExecutionFormValues>({
      resolver: yupResolver(createDatasetExecutionSchema),
      defaultValues: initialValues,
    });

  const onSubmit: SubmitHandler<CreateDatasetExecutionFormValues> = data => {
    mutate([data]);
  };

  const onReset: MouseEventHandler<HTMLButtonElement> = () => {
    reset(initialValues);
  };

  return (
    <BasicContainer
      title="Create Execution"
      isLoading={isLoadingDatasets}
      actions={
        <div className="flex justify-end gap-2">
          <ButtonLink
            to="/datasets/executions"
            className="bg-indigo-100 text-sm text-indigo-700"
            leftIcon={<ArrowLeftIcon className="mr-2 h-5 w-5" />}
          >
            Cancel
          </ButtonLink>
        </div>
      }
    >
      {datasets ? (
        <CreateExecutionForm
          control={control}
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
          onReset={onReset}
          datasets={datasets.map(({ id, name }) => ({
            label: name,
            value: id as unknown as string,
          }))}
        />
      ) : null}
    </BasicContainer>
  );
};

export default CreateDatasetExecution;
