import React, { Fragment, useMemo, forwardRef } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import clsx from '@/utils/clsx';
import { CheckIcon } from '@heroicons/react/solid';

interface SelectPropsI<T> {
  items: { label: string; value: string }[];
  value: T | string;
  label?: string;
  onChange: (value: T) => void;
  disabled?: boolean | undefined;
  horizontal?: boolean | undefined;
  name?: string | undefined;
  multiple?: boolean | undefined;
}

const Select = <T,>({
  items,
  value,
  label,
  onChange,
  name,
  horizontal,
  multiple,
}: SelectPropsI<T>) => {
  const selectedValue = items.find(item => item.value === value)?.label;

  console.log(items);
  return (
    <Listbox
      value={value}
      onChange={onChange}
      name={name}
      horizontal={horizontal}
      multiple={multiple}
    >
      {label ? (
        <Listbox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Listbox.Label>
      ) : null}
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
          <span className="block truncate">{selectedValue}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {items.map((item, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                clsx(
                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                )
              }
              value={item.value}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={clsx(
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    )}
                  >
                    {item.label}
                  </span>

                  {selected ? (
                    <span
                      className={clsx(
                        active ? 'text-white' : 'text-indigo-600',
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default forwardRef(Select);
