import React, { FC, useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ForecastExecutionType } from '@/types/execution.type';
import { Table } from '@/components';
import { ButtonLink } from '@/components/form';
import { EyeIcon } from '@heroicons/react/outline';
import { toCalendar } from '@/utils/common';

interface ExecutionsTablePropsI {
  data?: ForecastExecutionType[];
}

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    className?: string;
  }
}

const ExecutionsTable: FC<ExecutionsTablePropsI> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ForecastExecutionType>[]>(() => {
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
        id: 'dataset_name',
        header: () => <span>Dataset</span>,
        cell: ({ row }) => (
          <ButtonLink
            className="bg-indigo-100 text-xs text-indigo-700"
            to={`/forecasts/${row.original.forecast.id}`}
            leftIcon={<EyeIcon className="mr-2 h-5 w-5" />}
          >
            {row.original.forecast.name}
          </ButtonLink>
        ),
      },
      {
        id: 'results',
        header: () => <span>Results</span>,
        cell: ({ row }) => (
          <ButtonLink
            className="bg-indigo-100 text-xs text-indigo-700"
            to={`/forecasts/results/${row.original.result.id}`}
            leftIcon={<EyeIcon className="mr-2 h-5 w-5" />}
          >
            Results
          </ButtonLink>
        ),
      },
      {
        id: 'time',
        header: () => <span>Time(ms)</span>,
        accessorFn: row => row.result.time.toFixed(4),
      },
      {
        id: 'created_at',
        header: () => <span>Created At</span>,
        accessorFn: row => toCalendar(row.created_at),
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
            <Table table={table} isPaginated />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionsTable;
