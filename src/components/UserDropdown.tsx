import React, { Fragment, useMemo } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import clsx from '@/utils/clsx';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { useAuth } from '@/hooks/useAuth';

interface DropdownPropsI {
  title: string;
  items: { name: string; onClick?: () => void; href?: string }[];
}

const UserDropdown = () => {
  const { token, logout } = useAuth();
  const { data: user, isLoading } = useTypeSafeQuery(['me'], undefined, {
    enabled: !!token,
  });

  const dropdownItems: DropdownPropsI[] = useMemo(
    () => [
      {
        title: 'Profile',
        items: [
          {
            name: 'Logout',
            onClick: logout,
          },
        ],
      },
    ],
    [user],
  );

  return (
    <Menu as="div" className="relative inline-block px-2 text-left">
      <div>
        <Menu.Button
          className="group w-full rounded-md bg-gray-900 px-3.5 py-2 text-left text-sm font-medium text-gray-300 hover:bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-700"
          disabled={isLoading}
        >
          <span className="flex w-full items-center justify-between">
            <span className="flex min-w-0 items-center justify-between space-x-3">
              {user ? (
                <>
                  <svg
                    className="h-10 w-10 text-gray-300"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    ></path>
                  </svg>

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-gray-300">
                      {user?.name}
                    </span>
                    <span className="truncate text-sm text-gray-500">
                      {user?.email}
                    </span>
                  </span>
                </>
              ) : (
                <div role="status" className="animate-pulse">
                  <div className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-10 w-10 text-gray-200 dark:text-gray-700"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div className="mr-3 h-2.5 w-28 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </span>
            <SelectorIcon
              className="h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-800 rounded-md bg-gray-900 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
          {dropdownItems.map(itemGroup =>
            itemGroup.items.map((item, index) => (
              <div className="py-1" key={index}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={item.onClick}
                      className={clsx(
                        active ? 'bg-gray-800 text-gray-300' : 'text-gray-300',
                        'block w-full px-4 py-2 text-left text-sm',
                      )}
                    >
                      {item.name}
                    </button>
                  )}
                </Menu.Item>
              </div>
            )),
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
