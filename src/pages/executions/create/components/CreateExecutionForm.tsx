import React, { FC, MouseEventHandler } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { CreateExecutionFormValues } from '@/types/execution.type';
import { Button, Input, Select } from '@/components/form';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';

interface CreateExecutionFormPropsI
  extends Required<
    Pick<UseControllerProps<CreateExecutionFormValues>, 'control'>
  > {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  onReset: MouseEventHandler<HTMLButtonElement>;
  datasets: { label: string; value: string }[];
}

const CreateExecutionForm: FC<CreateExecutionFormPropsI> = ({
  control,
  onSubmit,
  isLoading,
  onReset,
  datasets,
}) => {
  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <div className="space-y-8 sm:space-y-5">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            General Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Execution general information.
          </p>
        </div>
        <div>
          <div className="bg-white shadow sm:rounded-md">
            <div className="relative px-4 py-4 sm:px-6">
              <Input<CreateExecutionFormValues>
                type="text"
                label="Name"
                name="name"
                placeholder="Execution name"
                control={control}
              />
            </div>
            <div className="relative px-4 py-4 sm:px-6">
              <Select<CreateExecutionFormValues>
                label="Dataset"
                name="dataset_id"
                control={control}
                items={[
                  {
                    label: 'Select a dataset',
                    value: '',
                  },
                  ...datasets,
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t py-6">
        <Button
          type="button"
          className="border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm"
          isLoading={isLoading}
          onClick={onReset}
          leftIcon={<TrashIcon className="mr-2 h-5 w-5" aria-hidden="true" />}
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="bg-indigo-600 text-base text-sm hover:ring-indigo-700 focus:ring-indigo-500"
          isLoading={isLoading}
          leftIcon={<PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />}
        >
          Create Execution
        </Button>
      </div>
    </form>
  );
};

export default CreateExecutionForm;
