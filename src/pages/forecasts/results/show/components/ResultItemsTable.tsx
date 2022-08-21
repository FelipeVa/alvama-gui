import React, { FC, useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ForecastResultItemType } from '@/types/result.type';
import { Table } from '@/components';
import { ButtonLink } from '@/components/form';

interface ResultItemsTablePropsI {
  data?: ForecastResultItemType[];
}

const ResultItemsTable: FC<ResultItemsTablePropsI> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ForecastResultItemType>[]>(() => {
    return [
      {
        id: 'method',
        header: () => <span>Method</span>,
        accessorFn: row => row.method,
      },
      {
        id: 'mean_squared_error',
        header: () => <span>Mean Squared Error</span>,
        accessorFn: row => row.mean_squared_error,
      },
      {
        id: 'value',
        header: () => <span>Value</span>,
        accessorFn: row => row.value,
      },
      {
        id: 'selected',
        header: () => <span>Selected</span>,
        accessorFn: row => row.selected,
        cell: ({ row }) =>
          row.original.selected ? (
            <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
              Yes
            </span>
          ) : (
            <span className="inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
              No
            </span>
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
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      minSize: 10,
    },
  });
  return (
    <div className="space-y-8 sm:space-y-5">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Result Items
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Table of result items.
        </p>
      </div>
      <div>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <Table table={table} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItemsTable;
