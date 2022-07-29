import React, { FC, MouseEventHandler } from 'react';
import { FieldErrors, UseControllerProps } from 'react-hook-form';
import { CreateForecastFormValues } from '@/types/forecast.type';
import { Button, Input } from '@/components/form';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import ForecastItemsFieldArray from '@/pages/forecasts/create/components/ForecastItemsFieldArray';
import clsx from '@/utils/clsx';

interface CreateForecastFormPropsI
  extends Required<
    Pick<UseControllerProps<CreateForecastFormValues>, 'control'>
  > {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  onReset: MouseEventHandler<HTMLButtonElement>;
  errors: FieldErrors<CreateForecastFormValues>;
}

const CreateForecastForm: FC<CreateForecastFormPropsI> = ({
  control,
  onSubmit,
  isLoading,
  onReset,
  errors,
}) => {
  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <div className="space-y-8 sm:space-y-5">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            General Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Forecast general information.
          </p>
        </div>
        <div>
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <div className="relative px-4 py-4 sm:px-6">
              <Input<CreateForecastFormValues>
                type="text"
                label="Name"
                name="name"
                placeholder="Forecast name"
                control={control}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 sm:space-y-5">
        <ForecastItemsFieldArray
          control={control}
          className={clsx({
            'shadow shadow-red-500': errors.items?.message,
          })}
        />

        {errors.items?.message ? (
          <div
            className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            {errors.items.message}
          </div>
        ) : null}
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
          Create Forecast
        </Button>
      </div>
    </form>
  );
};

export default CreateForecastForm;
