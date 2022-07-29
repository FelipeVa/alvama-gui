import React, { FC } from 'react';
import clsx from '@/utils/clsx';
import {
  CollectionIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuIcon,
  PlayIcon,
} from '@heroicons/react/outline';
import { useDisclose } from '@/hooks/useDisclose';
import { NavLink } from 'react-router-dom';

interface BasicLayoutPropsI {
  children: React.ReactNode;
}

const navigation = [
  {
    items: [{ name: 'Dashboard', href: '/', icon: HomeIcon, current: true }],
  },
  {
    title: 'Datasets',
    items: [
      { name: 'Datasets', href: '/datasets', icon: CollectionIcon },
      { name: 'Executions', href: '/datasets/executions', icon: PlayIcon },
      { name: 'Results', href: '/datasets/results', icon: DocumentReportIcon },
    ],
  },
  {
    title: 'Forecasts',
    items: [
      { name: 'Forecasts', href: '/forecasts', icon: CollectionIcon },
      { name: 'Executions', href: '/forecasts/executions', icon: PlayIcon },
      { name: 'Results', href: '/forecasts/results', icon: DocumentReportIcon },
    ],
  },
];

const BasicLayout: FC<BasicLayoutPropsI> = ({ children }) => {
  const { onOpen } = useDisclose();

  return (
    <>
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((group, index) => (
                <div key={index}>
                  {group.title ? (
                    <h3
                      className="my-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-300"
                      id="projects-headline"
                    >
                      {group.title}
                    </h3>
                  ) : null}
                  {group?.items.map(item => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        clsx(
                          isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                        )
                      }
                      end
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={clsx(
                              isActive
                                ? 'text-gray-300'
                                : 'text-gray-400 group-hover:text-gray-300',
                              'mr-3 h-6 w-6 flex-shrink-0',
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex h-screen flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={onOpen}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default BasicLayout;
