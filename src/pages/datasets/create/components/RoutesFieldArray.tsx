import React, { FC } from 'react';
import { UseControllerProps, useFieldArray } from 'react-hook-form';
import Button from '@/components/form/Button';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import Input from '@/components/form/Input';
import { CreateDatasetFormValues } from '@/types/dataset.type';

interface RoutesFieldArrayPropsI
  extends Pick<UseControllerProps<CreateDatasetFormValues>, 'control'> {}

const RoutesFieldArray: FC<RoutesFieldArrayPropsI> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'routes',
  });

  const onAddRoute = () => {
    append({
      name: 'route-label',
      length: '0',
      demand: '0',
      cycle_time: '0',
    });
  };

  return (
    <div className="space-y-8 sm:space-y-5">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Routes</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This is where you can add routes to your model.
        </p>
      </div>
      <div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative grid grid-cols-4 gap-2 px-4 py-4 sm:px-6"
              >
                <div className="absolute top-1.5 right-1.5">
                  <Button
                    type="button"
                    className="rounded-full bg-red-200 p-1 px-2 text-[10px] font-normal text-red-700 hover:bg-red-300 focus:ring-red-500"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="h-3 w-3" />
                    <span>Remove</span>
                  </Button>
                </div>
                <div className="col-span-1">
                  <Input<CreateDatasetFormValues>
                    type="text"
                    label="Label"
                    name={`routes.${index}.name`}
                    control={control}
                  />
                </div>
                <div className="col-span-1">
                  <Input<CreateDatasetFormValues>
                    type="text"
                    label="Length"
                    name={`routes.${index}.length`}
                    control={control}
                  />
                </div>
                <div className="col-span-1">
                  <Input<CreateDatasetFormValues>
                    type="text"
                    label="Demand"
                    name={`routes.${index}.demand`}
                    control={control}
                  />
                </div>
                <div className="col-span-1">
                  <Input<CreateDatasetFormValues>
                    type="text"
                    label="Cycle Time"
                    name={`routes.${index}.cycle_time`}
                    control={control}
                  />
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <Button
            type="button"
            className="bg-indigo-600 text-sm hover:ring-indigo-700 focus:ring-indigo-500"
            leftIcon={<PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />}
            onClick={onAddRoute}
          >
            Add Route
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoutesFieldArray;
