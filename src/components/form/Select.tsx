import React from 'react';
import {
  Path,
  useController,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { default as SelectComponent } from '@/components/Select';

interface SelectInputPropsI<T> {
  name: Path<T>;
  label?: string;
  control: UseControllerProps<T>['control'];
  rules?: UseControllerProps['rules'];
  items: { label: string; value: string }[];
}

const Select = <T,>({
  name,
  label,
  control,
  rules,
  items,
}: SelectInputPropsI<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <div className="relative mt-1 rounded-md shadow-sm">
        <SelectComponent
          {...field}
          label={label}
          items={items}
          value={field.value as UseControllerReturn['field']['value']}
        />
        {fieldState.error ? (
          <div className="pointer-events-none absolute inset-y-0 top-6 right-4 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>
      {fieldState.error ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {fieldState.error.message}
        </p>
      ) : null}
    </div>
  );
};

export default Select;
