import React, { MouseEventHandler, useEffect } from 'react';
import { useFileImporter } from '@/hooks/useFileImporter';
import { SubmitHandler, useForm } from 'react-hook-form';
import BasicContainer from '@/components/layouts/BasicContainer';
import { Button, ButtonLink } from '@/components/form';
import { ArrowLeftIcon, UploadIcon } from '@heroicons/react/outline';
import { CreateDatasetFormValues } from '@/types/dataset.type';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { createDatasetSchema } from '@/schemas/dataset.schema';
import CreateDatasetForm from '@/pages/datasets/create/components/CreateDatasetForm';
import { useNotifier } from '@/hooks/useNotifier';

const initialValues: CreateDatasetFormValues = {
  name: '',
  routes: [
    {
      name: '',
      length: '0',
      demand: '0',
      cycle_time: '0',
    },
  ],
  buses: [
    {
      name: '',
      capacities: [],
      cost_per_km: '0',
    },
  ],
};

const CreateDataset = () => {
  const notifier = useNotifier();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { importData, onImport, isImporting } =
    useFileImporter<CreateDatasetFormValues>({
      formats: ['json'],
    });
  const { mutate, isLoading } = useTypeSafeMutation('createDataset', {
    onSuccess: () => {
      navigate('/datasets');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getDatasets']);
    },
  });

  const { control, handleSubmit, reset, setValue } =
    useForm<CreateDatasetFormValues>({
      resolver: yupResolver(createDatasetSchema),
      defaultValues: initialValues,
    });

  const onSubmit: SubmitHandler<CreateDatasetFormValues> = data => {
    mutate([data]);
  };

  const onReset: MouseEventHandler<HTMLButtonElement> = () => {
    reset(initialValues);
  };

  useEffect(() => {
    if (importData) {
      if (
        !['buses', 'routes'].every(key => Object.keys(importData).includes(key))
      ) {
        notifier.notify({
          title: 'Invalid File',
          message: 'The file is not a valid model file.',
        });

        return;
      }

      reset({
        ...(importData as CreateDatasetFormValues),
        name: importData?.name ?? `Dataset #${Math.floor(Math.random() * 11)}`,
      });
    }
  }, [importData]);

  return (
    <BasicContainer
      title="Create Dataset"
      actions={
        <div className="flex justify-end gap-2">
          <ButtonLink
            to="/datasets"
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
      <CreateDatasetForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
        onReset={onReset}
        setValue={setValue}
      />
    </BasicContainer>
  );
};

export default CreateDataset;
