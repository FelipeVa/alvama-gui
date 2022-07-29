import React, { FC } from 'react';
import { UseControllerProps, useFieldArray } from 'react-hook-form';
import { CreateForecastFormValues } from '@/types/forecast.type';
import { Button, Input } from '@/components/form';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import clsx from '@/utils/clsx';

interface ForecastItemsFieldArrayPropsI
  extends Pick<UseControllerProps<CreateForecastFormValues>, 'control'> {
  className?: string;
}

const ForecastItemsFieldArray: FC<ForecastItemsFieldArrayPropsI> = ({
  control,
  className,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onAddItem = () => {
    append({
      name: `Demand #${fields.length + 1}`,
      value: '0',
    });
  };

  return (
    <div className="space-y-8 sm:space-y-5">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Items</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is where you can add items to your forecast, mostly demand
            values.
          </p>
        </div>
      </div>
      <div>
        <div
          className={clsx(
            'overflow-hidden bg-white shadow sm:rounded-md',
            className,
          )}
        >
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
                    <div className="col-span-1">
                      <Input<CreateForecastFormValues>
                        type="text"
                        label="Name"
                        name={`items.${index}.name`}
                        control={control}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input<CreateForecastFormValues>
                        type="number"
                        label="Value"
                        name={`items.${index}.value`}
                        control={control}
                      />
                    </div>
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
            onClick={onAddItem}
          >
            Add Item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForecastItemsFieldArray;
