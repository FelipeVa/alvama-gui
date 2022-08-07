import React, { MouseEventHandler, useEffect } from 'react';
import { Button, ButtonLink } from '@/components/form';
import { ArrowLeftIcon, UploadIcon } from '@heroicons/react/outline';
import { BasicContainer } from '@/components/layouts';
import { useFileImporter } from '@/hooks/useFileImporter';
import { CreateForecastFormValues } from '@/types/forecast.type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateForecastForm } from '@/pages/forecasts/create/components';
import { useNotifier } from '@/hooks/useNotifier';
import { createForecastSchema } from '@/schemas/forecast.schema';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const initialValues: CreateForecastFormValues = {
  name: '',
  items: [
    {
      name: '',
      value: '',
    },
  ],
};

const CreateForecast = () => {
  const notifier = useNotifier();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { importData, onImport, isImporting } =
    useFileImporter<CreateForecastFormValues>({
      csv_delimiter: ';',
      columns: ['name', 'value'],
    });

  const { mutate, isLoading } = useTypeSafeMutation('createForecast', {
    onSuccess: () => {
      navigate('/forecasts');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getForecasts']);
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateForecastFormValues>({
    resolver: yupResolver(createForecastSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<CreateForecastFormValues> = data => {
    mutate([data]);
  };

  const onReset: MouseEventHandler<HTMLButtonElement> = () => {
    reset(initialValues);
  };

  useEffect(() => {
    if (importData) {
      if (Array.isArray(importData)) {
        reset({
          name: `Forecast #${Math.floor(Math.random() * 11)}`,
          items: importData,
        });

        return;
      }

      if (
        !['name', 'items'].every(key => Object.keys(importData).includes(key))
      ) {
        notifier.notify({
          title: 'Invalid File',
          message: 'The file is not a valid forecast file.',
        });

        return;
      }

      reset({
        ...(importData as CreateForecastFormValues),
        name: importData?.name ?? `Forecast #${Math.floor(Math.random() * 11)}`,
      });
    }
  }, [importData]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <BasicContainer
      title="Create Forecast"
      isLoading={isLoading}
      actions={
        <div className="flex justify-end gap-2">
          <ButtonLink
            to="/forecasts"
            className="bg-indigo-100 text-sm text-indigo-700"
            leftIcon={<ArrowLeftIcon className="mr-2 h-5 w-5" />}
          >
            Cancel
          </ButtonLink>
          <Button
            className="bg-indigo-600 text-sm hover:ring-indigo-700 focus:ring-indigo-500"
            placeholder="Upload file"
            onClick={onImport}
            leftIcon={
              <UploadIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            }
            isLoading={isImporting}
          >
            Import Data
          </Button>
        </div>
      }
    >
      <CreateForecastForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isImporting}
        errors={errors}
        onReset={onReset}
      />
    </BasicContainer>
  );
};

export default CreateForecast;
