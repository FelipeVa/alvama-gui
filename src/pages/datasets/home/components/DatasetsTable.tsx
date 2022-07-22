import React, { FC, useMemo, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { DatasetType } from '@/types/api.type';
import { Button, ButtonLink } from '@/components/form';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import clsx from '@/utils/clsx';

interface DatasetsTablePropsI {
  onDestroy: (id: number) => void;
  data?: DatasetType[];
}

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    className?: string;
  }
}

const DatasetsTable: FC<DatasetsTablePropsI> = ({ onDestroy, data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<DatasetType>[]>(() => {
    return [
      {
        id: 'id',
        header: () => <span>#</span>,
        accessorFn: row => row.id,
      },
      {
        id: 'name',
        header: () => <span>Name</span>,
        accessorFn: row => row.name,
      },
      {
        id: 'buses',
        header: () => <span># of Buses</span>,
        accessorFn: row => row.buses.length,
      },
      {
        id: 'routes',
        header: () => <span># of Routes</span>,
        accessorFn: row => row.routes.length,
      },
      {
        id: 'created_at',
        header: () => <span>Created At</span>,
        accessorFn: row => row.created_at,
      },
      {
        id: 'actions',
        header: () => <></>,
        meta: {
          className:
            'relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6',
        },
        cell: ({ row }) => (
          <div className="flex items-end justify-end space-x-2">
            <ButtonLink
              to={`/datasets/${row.original.id}`}
              className="bg-indigo-100 text-xs text-indigo-700"
            >
              View
            </ButtonLink>
            <Button
              className="bg-red-100 text-xs text-red-700"
              onClick={() => onDestroy(row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ];
  }, []);

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        <span
                          className="group inline-flex cursor-pointer"
                          onClick={header.column.getToggleSortingHandler()}
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
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className={clsx(
                          {
                            'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6':
                              !cell.column.columnDef.meta?.className,
                          },
                          cell.column.columnDef.meta?.className,
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetsTable;
