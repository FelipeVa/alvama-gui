import React, { FC, useMemo, useState } from 'react';
import { ForecastType } from '@/types/forecast.type';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { toCalendar } from '@/utils/common';
import { Button, ButtonLink } from '@/components/form';
import { Table } from '@/components';

interface ForecastsTablePropsI {
  onDestroy: (id: number) => void;
  data?: ForecastType[];
}

const ForecastsTable: FC<ForecastsTablePropsI> = ({ onDestroy, data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ForecastType>[]>(() => {
    return [
      {
        id: 'id',
        header: () => <span>#</span>,
        accessorFn: row => row.id,
        size: 20,
      },
      {
        id: 'name',
        header: () => <span>Name</span>,
        accessorFn: row => row.name,
      },
      {
        id: 'items',
        header: () => <span># of Items</span>,
        accessorFn: row => row.items.length,
      },
      {
        id: 'created_at',
        header: () => <span>Created At</span>,
        accessorFn: row => toCalendar(row.created_at),
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
              to={`/forecasts/${row.original.id}`}
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
  });

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <Table table={table} isPaginated />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastsTable;
