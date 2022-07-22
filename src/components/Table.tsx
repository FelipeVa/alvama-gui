import React from 'react';
import { flexRender, Table as TableType } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import clsx from '@/utils/clsx';

interface TablePropsI<T> {
  table: TableType<T>;
  isPaginated?: boolean;
}

const Table = <T,>({ table, isPaginated = false }: TablePropsI<T>) => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className={clsx(
                    'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6',
                  )}
                  style={{
                    width: header.getSize(),
                  }}
                >
                  <span
                    className={clsx('group inline-flex', {
                      'cursor-pointer': header.column.getCanSort(),
                    })}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanSort() ? (
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        {{
                          asc: (
                            <ChevronUpIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(header => (
                <td
                  key={header.id}
                  className={clsx(
                    {
                      'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6':
                        !header.column.columnDef.meta?.className,
                    },
                    header.column.columnDef.meta?.className,
                  )}
                >
                  {flexRender(
                    header.column.columnDef.cell,
                    header.getContext(),
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isPaginated ? (
        <nav
          className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {table.getState().pagination.pageIndex === 0
                  ? table.getState().pagination.pageIndex + 1
                  : table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                    1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {table.getRowModel().rows.length ===
                table.getState().pagination.pageSize
                  ? (table.getState().pagination.pageIndex + 1) *
                    table.getRowModel().rows.length
                  : table.getCoreRowModel().rows.length}
              </span>{' '}
              of{' '}
              <span className="font-medium">
                {table.getCoreRowModel().rows.length}
              </span>{' '}
              results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Table;
