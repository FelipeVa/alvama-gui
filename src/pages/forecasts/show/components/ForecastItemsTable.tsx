import React, { FC, useMemo, useState } from 'react';
import { ForecastItemType } from '@/types/forecast.type';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from '@/components';

interface ForecastItemsTablePropsI {
  items: ForecastItemType[];
}

const ForecastItemsTable: FC<ForecastItemsTablePropsI> = ({ items }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ForecastItemType>[]>(() => {
    return [
      {
        id: 'name',
        header: () => <span>Name</span>,
        accessorFn: row => row.name,
        size: 450,
      },
      {
        id: 'value',
        header: () => <span>Value</span>,
        accessorFn: row => row.value,
      },
    ];
  }, []);

  const table = useReactTable({
    data: items ?? [],

    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      minSize: 20,
    },
  });

  return (
    <div className="space-y-8 sm:space-y-5">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Items</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Table of items that are used in the forecast.
        </p>
      </div>
      <div>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <Table table={table} isPaginated />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastItemsTable;
