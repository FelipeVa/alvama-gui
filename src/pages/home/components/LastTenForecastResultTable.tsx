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
import { ForecastResultType } from '@/types/result.type';
import clsx from '@/utils/clsx';

interface LastTenForecastResultTablePropsI {
  data?: ForecastResultType[];
}

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    className?: string;
  }
}

const LastTenForecastResultTable: FC<LastTenForecastResultTablePropsI> = ({
  data,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const getSelectedResultRow = (row: ForecastResultType) => {
    return row?.result_items?.find(item => item.selected);
  };

  const columns = useMemo<ColumnDef<ForecastResultType>[]>(() => {
    return [
      {
        id: 'method',
        header: () => <span>Method</span>,
        cell: ({ row }) => (
          <span
            className={clsx(
              'inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800',
            )}
          >
            {getSelectedResultRow(row.original)?.method}
          </span>
        ),
      },
      {
        id: 'value',
        header: () => <span>Value</span>,
        accessorFn: row => getSelectedResultRow(row)?.value,
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
              to={`/forecasts/results/${row.original.id}`}
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

export default LastTenForecastResultTable;
