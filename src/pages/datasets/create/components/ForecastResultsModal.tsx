import React, { FC, useEffect, useMemo, useState } from 'react';
import { Modal, Table } from '@/components';
import { ForecastResultType } from '@/types/result.type';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Button, ButtonLink } from '@/components/form';
import { EyeIcon } from '@heroicons/react/outline';
import clsx from '@/utils/clsx';
import { toCalendar } from '@/utils/common';

interface ForecastResultsModalPropsI {
  isOpen: boolean;
  currentRoute?: number;
  onClose: () => void;
  onSubmit: (value: string, index: number) => void;
  data?: ForecastResultType[];
}

const ForecastResultsModal: FC<ForecastResultsModalPropsI> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
  currentRoute,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const onChooseValue = (value: string) => {
    if (currentRoute === undefined) {
      return;
    }

    onSubmit(value, currentRoute);
    onClose();
  };

  const columns = useMemo<ColumnDef<ForecastResultType>[]>(() => {
    return [
      {
        id: 'id',
        header: () => <span>#</span>,
        accessorFn: row => row.id,
        size: 20,
      },
      {
        id: 'forecast_name',
        header: () => <span>Execution</span>,
        cell: ({ row }) => (
          <ButtonLink
            className="bg-indigo-100 text-xs text-indigo-700"
            to={`/forecasts/executions/${row.original.execution.id}`}
            leftIcon={<EyeIcon className="mr-2 h-5 w-5" />}
          >
            {row.original.execution.name}
          </ButtonLink>
        ),
      },
      {
        id: 'method',
        header: () => <span>Method</span>,
        cell: ({ row }) => (
          <span
            className={clsx(
              'inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800',
            )}
          >
            {row.original.method}
          </span>
        ),
      },
      {
        id: 'vale',
        header: () => <span>Projected Value</span>,
        accessorFn: row => row.value,
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
            <Button
              onClick={() =>
                onChooseValue(row.original.value as unknown as string)
              }
              className="bg-indigo-100 text-xs text-indigo-700"
            >
              Use
            </Button>
          </div>
        ),
      },
    ];
  }, [currentRoute]);

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
    <Modal
      title="Select a forecast result"
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-5xl"
    >
      <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <Table table={table} isPaginated />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ForecastResultsModal;
