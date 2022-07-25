import React from 'react';
import { useNotifier } from '@/hooks/useNotifier';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { Button, ButtonLink } from '@/components/form';
import {
  ArrowLeftIcon,
  CalendarIcon,
  HashtagIcon,
  MapIcon,
  TrashIcon,
  TruckIcon,
} from '@heroicons/react/outline';
import { toCalendar } from '@/utils/common';
import { BusesTable, RoutesTable } from '@/pages/datasets/show/components';
import BasicContainer from '@/components/layouts/BasicContainer';

const ShowResult = () => {
  const notifier = useNotifier();
  const params = useParams();
  const resultId = params?.resultId as string;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useTypeSafeQuery(['getResult'], [resultId], {
    enabled: !!resultId,
  });
  return (
    <BasicContainer
      title={`Results of ${data?.execution.name}`}
      isLoading={isLoading}
      actions={
        <div className="flex justify-end gap-2">
          <ButtonLink
            to="/results"
            className="bg-indigo-100 text-sm text-indigo-700"
            leftIcon={<ArrowLeftIcon className="mr-2 h-5 w-5" />}
          >
            Go back
          </ButtonLink>
        </div>
      }
      description={
        <>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {/* <div className="mt-2 flex items-center text-sm text-gray-500"> */}
            {/*   <TruckIcon */}
            {/*     className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" */}
            {/*     aria-hidden="true" */}
            {/*   /> */}
            {/*   {totalBusesAvailable ?? 0} Buses */}
            {/* </div> */}
            {/* <div className="mt-2 flex items-center text-sm text-gray-500"> */}
            {/*   <MapIcon */}
            {/*     className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" */}
            {/*     aria-hidden="true" */}
            {/*   /> */}
            {/*   {data?.routes?.length} Routes */}
            {/* </div> */}
            {/* <div className="mt-2 flex items-center text-sm text-gray-500"> */}
            {/*   <HashtagIcon */}
            {/*     className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" */}
            {/*     aria-hidden="true" */}
            {/*   /> */}
            {/*   {busCapacities} Bus Capacities */}
            {/* </div> */}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Created {toCalendar(data?.created_at as string)}
            </div>
          </div>
        </>
      }
    >
      {data ? <div className="flex flex-col gap-8"></div> : null}
    </BasicContainer>
  );
};

export default ShowResult;
