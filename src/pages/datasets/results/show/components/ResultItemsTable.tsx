import React, { FC, useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { DatasetResultItemType } from '@/types/result.type';
import { Table } from '@/components';

interface ResultItemsTablePropsI {
  data?: DatasetResultItemType[];
}

const ResultItemsTable: FC<ResultItemsTablePropsI> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<DatasetResultItemType>[]>(() => {
    return [
      {
        id: 'route',
        header: () => <span>Route</span>,
        accessorFn: row => row.route.name,
      },
      {
        id: 'bus',
        header: () => <span>Bus</span>,
        accessorFn: row => row.bus.name,
      },
      {
        id: 'capacity',
        header: () => <span>Capacity</span>,
        accessorFn: row => row.capacity.name,
      },
      {
        id: 'bus_amount_to_be_used',
        header: () => <span># of Buses To Be Used</span>,
        accessorFn: row => row.value,
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
                <Table table={table} isPaginated />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItemsTable;
