import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { ButtonLink } from '@/components/form';
import { ArrowLeftIcon, CalendarIcon, EyeIcon } from '@heroicons/react/outline';
import { toCalendar, toUSD } from '@/utils/common';
import BasicContainer from '@/components/layouts/BasicContainer';
import clsx from '@/utils/clsx';
import { ResultItemsTable } from '@/pages/datasets/results/show/components';

const ShowDatasetResult = () => {
  const params = useParams();
  const resultId = params?.resultId as string;
  const { data, isLoading } = useTypeSafeQuery(
    ['getDatasetResult'],
    [resultId],
    {
      enabled: !!resultId,
    },
  );

  const { data: dataset } = useTypeSafeQuery(
    ['getDataset'],
    [data?.dataset?.id as unknown as string],
    {
      enabled: !!data?.dataset.id,
    },
  );
  const busesToBeUsed = useMemo(() => {
    return data?.result_items
      .map(item => parseInt(item.value))
      .reduce((acc, curr) => {
        return acc + curr;
      }) as unknown as number;
  }, [data]);

  const busesAvailable = useMemo(() => {
    return dataset?.buses
      .map(bus => bus.capacities.map(capacity => capacity.available))
      .flat()
      .reduce((acc, curr) => {
        return acc + parseInt(curr);
      }) as unknown as number;
  }, [data, dataset]);

  const buseUsagePercentage = useMemo(() => {
    if (!busesToBeUsed && !busesAvailable) {
      return;
    }

    return ((busesToBeUsed / busesAvailable) * 100).toFixed(2);
  }, [busesToBeUsed, busesAvailable]);

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
      {data ? (
        <div className="flex flex-col gap-8">
          <div className="space-y-8 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                General Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                General information about the result.
              </p>
            </div>
            <div>
              <div className="mt-4 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">
                                Status
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                <span
                                  className={clsx(
                                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                                    {
                                      'bg-green-100 text-green-800':
                                        data.status.toLowerCase() === 'optimal',
                                      'bg-red-100 text-red-800':
                                        data.status.toLowerCase() !== 'optimal',
                                    },
                                  )}
                                >
                                  {data.status}
                                </span>
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">
                                Time of execution
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {data.time} (ms)
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">
                                Costs
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {toUSD(data.objective)}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">
                                Dataset
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                <ButtonLink
                                  className="bg-indigo-100 text-xs text-indigo-700"
                                  to={`/datasets/${data.dataset.id}`}
                                  leftIcon={
                                    <EyeIcon className="mr-2 h-5 w-5" />
                                  }
                                >
                                  {data.dataset.name}
                                </ButtonLink>
                              </dd>
                            </div>
                            <div className="sm:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">
                                Buses to be used
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {busesToBeUsed} of {busesAvailable} (
                                {buseUsagePercentage}% of available buses)
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ResultItemsTable data={data?.result_items} />
        </div>
      ) : null}
    </BasicContainer>
  );
};

export default ShowDatasetResult;
