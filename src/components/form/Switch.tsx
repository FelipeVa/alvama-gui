import React from 'react';
import {
  Path,
  useController,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';
import clsx from '@/utils/clsx';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { Switch as HeadlessSwitch } from '@headlessui/react';

interface SwitchPropsI<T> {
  name: Path<T>;
  label?: string;
  control: UseControllerProps<T>['control'];
  rules?: UseControllerProps['rules'];
  className?: string | undefined;
}

const Switch = <T,>({
  name,
  label,
  control,
  rules,
  className,
}: SwitchPropsI<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <HeadlessSwitch.Group as="div" className="flex items-center">
        <HeadlessSwitch
          name={name}
          checked={field.value as UseControllerReturn['field']['value']}
          onChange={field.onChange}
          className={clsx(
            field.value ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            className,
          )}
        >
          <span
            aria-hidden="true"
            className={clsx(
              field.value ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            )}
          />
        </HeadlessSwitch>
        <HeadlessSwitch.Label as="span" className="ml-3">
          <span className="text-sm font-medium text-gray-900">{label}</span>
        </HeadlessSwitch.Label>
      </HeadlessSwitch.Group>
      {fieldState.error ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      ) : null}
      {fieldState.error ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {fieldState.error.message}
        </p>
      ) : null}
    </div>
  );
};

export default Switch;
