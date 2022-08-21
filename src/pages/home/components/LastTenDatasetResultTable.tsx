import React, { FC, useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ButtonLink } from '@/components/form';
import { Table } from '@/components';
import { toCalendar, toUSD } from '@/utils/common';
import { DatasetResultType } from '@/types/result.type';
import clsx from '@/utils/clsx';

interface LastTenDatasetResultTablePropsI {
  data?: DatasetResultType[];
}

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    className?: string;
  }
}

const LastTenDatasetResultTable: FC<LastTenDatasetResultTablePropsI> = ({
  data,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<DatasetResultType>[]>(() => {
    return [
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
        accessorFn: row => toUSD(row.objective),
      },
      {
        id: 'time',
        header: () => <span>Time (ms)</span>,
        accessorFn: row => row.time,
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
              to={`/datasets/results/${row.original.id}`}
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
  });

  return (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <Table table={table} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastTenDatasetResultTable;
