import React, { FC } from 'react';
import { Modal } from '@/components';
import { BusCapacityType } from '@/types/dataset.type';

interface BusCapacitiesModalPropsI {
  isOpen: boolean;
  onClose: () => void;
  capacities: BusCapacityType[];
}

const BusCapacitiesModal: FC<BusCapacitiesModalPropsI> = ({
  isOpen,
  onClose,
  capacities,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bus Capacities">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Capacity
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Available
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {capacities.map((capacity, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                        {capacity.capacity}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {capacity.available}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BusCapacitiesModal;
