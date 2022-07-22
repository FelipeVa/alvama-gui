import React, { FC } from 'react';
import { UseControllerProps, useFieldArray } from 'react-hook-form';
import Button from '@/components/form/Button';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import Input from '@/components/form/Input';
import { CreateDatasetFormValues } from '@/types/dataset.type';

interface BusesFieldArrayPropsI
  extends Pick<UseControllerProps<CreateDatasetFormValues>, 'control'> {
  busIndex: number;
}

const CapacitiesBusesFieldArray: FC<BusesFieldArrayPropsI> = ({
  control,
  busIndex,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `buses.${busIndex}.capacities`,
  });

  const onAddBusCapacity = () => {
    append({
      capacity: '0',
      available: '0',
    });
  };

  return (
    <div className="border-t py-2">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Bus Capacities
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This is where you can add capacities to your bus.
        </p>
      </div>
      <div>
        <ul role="list" className="divide-y divide-gray-200">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative grid grid-cols-2 gap-2 py-4"
            >
              <div className="absolute top-1.5 right-0">
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
                  label="Capacity"
                  name={`buses.${busIndex}.capacities.${index}.capacity`}
                  control={control}
                />
              </div>
              <div className="col-span-1">
                <Input<CreateDatasetFormValues>
                  type="text"
                  label="Available"
                  name={`buses.${busIndex}.capacities.${index}.available`}
                  control={control}
                />
              </div>
            </div>
          ))}
        </ul>
        <div className="mt-4">
          <Button
            type="button"
            className="bg-indigo-100 text-sm font-normal text-indigo-700 hover:ring-indigo-700 focus:ring-indigo-500"
            leftIcon={<PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />}
            onClick={onAddBusCapacity}
          >
            Add Bus Capacity
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CapacitiesBusesFieldArray;
