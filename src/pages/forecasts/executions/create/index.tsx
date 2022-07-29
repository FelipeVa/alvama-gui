import React, { MouseEventHandler } from 'react';
import { CreateForecastFormValues } from '@/types/execution.type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createForecastExecutionSchema } from '@/schemas/execution.schema';
import { ButtonLink } from '@/components/form';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { BasicContainer } from '@/components/layouts';
import { CreateExecutionForm } from '@/pages/forecasts/executions/create/components';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';

const initialValues: CreateForecastFormValues = {
  name: '',
  forecast_id: '',
};

const CreateForecastExecution = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: forecasts, isLoading: isLoadingDatasets } = useTypeSafeQuery([
    'getForecasts',
  ]);
  const { mutate, isLoading } = useTypeSafeMutation('createForecastExecution', {
    onSuccess: () => {
      navigate('/forecasts/executions');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getForecastExecutions']);
    },
  });
  const { control, handleSubmit, reset } = useForm<CreateForecastFormValues>({
    resolver: yupResolver(createForecastExecutionSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<CreateForecastFormValues> = data => {
    console.log('pene');
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
            to="/forecast/executions"
            className="bg-indigo-100 text-sm text-indigo-700"
            leftIcon={<ArrowLeftIcon className="mr-2 h-5 w-5" />}
          >
            Cancel
          </ButtonLink>
        </div>
      }
    >
      {forecasts ? (
        <CreateExecutionForm
          control={control}
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
          onReset={onReset}
          forecasts={forecasts.map(({ id, name }) => ({
            label: name,
            value: id as unknown as string,
          }))}
        />
      ) : null}
    </BasicContainer>
  );
};

export default CreateForecastExecution;
