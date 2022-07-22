import React, { FC } from 'react';
import { UseControllerProps, useFieldArray } from 'react-hook-form';
import Button from '@/components/form/Button';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import Input from '@/components/form/Input';
import CapacitiesBusesFieldArray from '@/pages/datasets/create/components/CapacitiesBusesFieldArray';
import { CreateDatasetFormValues } from '@/types/dataset.type';

interface BusesFieldArrayPropsI
  extends Pick<UseControllerProps<CreateDatasetFormValues>, 'control'> {}

const BusesFieldArray: FC<BusesFieldArrayPropsI> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'buses',
  });

  const onAddBus = () => {
    append({
      brand: 'Bus Brand',
      capacities: [],
      costs: {
        per_km: '0',
      },
    });
  };

  return (
    <div className="space-y-8 sm:space-y-5">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Buses</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is where you can add buses to your model.
          </p>
        </div>
      </div>
      <div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {fields.map((field, index) => (
              <li key={field.id}>
                <div className="flex flex-col">
                  <div className="relative grid grid-cols-2 gap-2 px-4 py-4 sm:px-6">
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
                    <div className="col-span-2">
                      <Input<CreateDatasetFormValues>
                        type="text"
                        label="Brand"
                        name={`buses.${index}.brand`}
                        control={control}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input<CreateDatasetFormValues>
                        type="text"
                        label="Cost per km"
                        name={`buses.${index}.costs.per_km`}
                        control={control}
                      />
                    </div>
                  </div>

                  <div className="px-4 pb-4 sm:px-6">
                    <CapacitiesBusesFieldArray
                      control={control}
                      busIndex={index}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <Button
            type="button"
            className="bg-indigo-600 text-sm hover:ring-indigo-700 focus:ring-indigo-500"
            leftIcon={<PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />}
            onClick={onAddBus}
          >
            Add Bus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusesFieldArray;
