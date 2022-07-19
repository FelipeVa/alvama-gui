import React, { InputHTMLAttributes } from 'react';
import {
  Path,
  useController,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';
import clsx from '@/utils/clsx';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

interface InputPropsI<T> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  control: UseControllerProps<T>['control'];
  rules?: UseControllerProps['rules'];
}

const Input = <T,>({
  name,
  label,
  control,
  rules,
  className,
  ...restOfProps
}: InputPropsI<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          {...field}
          value={field.value as UseControllerReturn['field']['value']}
          placeholder={name}
          className={clsx(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            {
              'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500':
                fieldState.error,
            },
            className,
          )}
          {...restOfProps}
        />
        {fieldState.error ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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

export default Input;
