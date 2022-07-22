import React, { FC, useMemo, useState } from 'react';
import { RouteType } from '@/types/dataset.type';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from '@/components';

interface RoutesTablePropsI {
  routes: RouteType[];
}

const RoutesTable: FC<RoutesTablePropsI> = ({ routes }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<RouteType>[]>(() => {
    return [
      {
        id: 'name',
        header: () => <span>Name</span>,
        accessorFn: row => row.name,
        size: 450,
      },
      {
        id: 'cost_per_km',
        header: () => <span>Length (Km)</span>,
        accessorFn: row => row.length,
      },
      {
        id: 'capacities',
        header: () => <span>Demand</span>,
        accessorFn: row => row.demand,
      },
      {
        id: 'number_of_buses',
        header: () => <span>Cycle Time (min)</span>,
        accessorFn: row => row.cycle_time,
      },
    ];
  }, []);

  const table = useReactTable({
    data: routes ?? [],

    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    defaultColumn: {
      minSize: 20,
    },
  });

  return (
    <>
      <div className="space-y-8 sm:space-y-5">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Routes
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Table of routes with all their properties.
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
    </>
  );
};

export default RoutesTable;
