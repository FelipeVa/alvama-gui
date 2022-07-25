import React, { FC, useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { toCalendar } from '@/utils/common';
import { Table } from '@/components';
import { ResultType } from '@/types/result.type';
import { Button, ButtonLink } from '@/components/form';
import clsx from '@/utils/clsx';
import { EyeIcon } from '@heroicons/react/outline';

interface ResultsTablePropsI {
  data?: ResultType[];
}
const ResultsTable: FC<ResultsTablePropsI> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ResultType>[]>(() => {
    return [
      {
        id: 'id',
        header: () => <span>#</span>,
        accessorFn: row => row.id,
        size: 20,
      },
      {
        id: 'dataset_name',
        header: () => <span>Execution</span>,
        cell: ({ row }) => (
          <ButtonLink
            className="bg-indigo-100 text-xs text-indigo-700"
            to={`/executions/${row.original.execution.id}`}
            leftIcon={<EyeIcon className="mr-2 h-5 w-5" />}
          >
            {row.original.execution.name}
          </ButtonLink>
        ),
      },
      {
        id: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => (
          <span
            className={clsx(
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
              {
                'bg-green-100 text-green-800':
                  row.original.status.toLowerCase() === 'optimal',
                'bg-red-100 text-red-800':
                  row.original.status.toLowerCase() !== 'optimal',
              },
            )}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        id: 'objective',
        header: () => <span>Objective</span>,
        accessorFn: row => row.objective,
      },
      {
        id: 'time',
        header: () => <span>Time (ms)</span>,
        accessorFn: row => row.time,
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
              to={`/results/${row.original.id}`}
              className="bg-indigo-100 text-xs text-indigo-700"
            >
              View
            </ButtonLink>
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
            <Table table={table} isPaginated />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
