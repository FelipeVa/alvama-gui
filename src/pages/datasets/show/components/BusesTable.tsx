import React, { FC, useMemo, useState } from 'react';
import { BusCapacityType, BusType } from '@/types/dataset.type';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Table, Modal } from '@/components';
import { Button } from '@/components/form';
import { EyeIcon } from '@heroicons/react/outline';
import { useDisclose } from '@/hooks/useDisclose';
import BusCapacitiesModal from '@/pages/datasets/show/components/BusCapacitiesModal';

interface BusesTablePropsI {
  buses: BusType[];
}

const BusesTable: FC<BusesTablePropsI> = ({ buses }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [capacities, setCapacities] = useState<BusCapacityType[]>([]);
  const { isOpen, onClose, onOpen } = useDisclose();

  const onOpenCapacities = (busCapacities: BusCapacityType[]) => {
    setCapacities(busCapacities);
    onOpen();
  };

  const columns = useMemo<ColumnDef<BusType>[]>(() => {
    return [
      {
        id: 'name',
        header: () => <span>Brand</span>,
        accessorFn: row => row.brand,
        size: 450,
      },
      {
        id: 'cost_per_km',
        header: () => <span>Cost Per KM</span>,
        accessorFn: row => row.cost_per_km,
      },
      {
        id: 'capacities',
        header: () => <span># of Capacities</span>,
        accessorFn: row => row.capacities.length,
      },
      {
        id: 'number_of_buses',
        header: () => <span># of Buses</span>,
        accessorFn: row =>
          row.capacities
            .map(capacity => capacity.available)
            .reduce((acc, curr) => acc + parseInt(curr), 0),
      },
      {
        id: 'actions',
        header: () => <></>,
        size: 20,
        meta: {
          className:
            'relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 relative',
        },
        cell: ({ row }) => (
          <div className="flex items-end justify-end space-x-2">
            <Button
              className="bg-indigo-100 text-xs text-indigo-700"
              leftIcon={<EyeIcon className="mr-2 h-5 w-5" />}
              onClick={() => onOpenCapacities(row.original.capacities)}
            >
              Show Capacities
            </Button>
          </div>
        ),
      },
    ];
  }, []);

  const table = useReactTable({
    data: buses ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    defaultColumn: {
      minSize: 10,
    },
  });

  return (
    <>
      <div className="space-y-8 sm:space-y-5">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Buses</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Table of buses and their capacities and costs.
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

      <BusCapacitiesModal
        isOpen={isOpen}
        onClose={onClose}
        capacities={capacities}
      />
    </>
  );
};

export default BusesTable;
