import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { ButtonLink } from '@/components/form';
import { ArrowLeftIcon, CalendarIcon, EyeIcon } from '@heroicons/react/outline';
import { toCalendar } from '@/utils/common';
import BasicContainer from '@/components/layouts/BasicContainer';
import { ResultItemsTable } from '@/pages/forecasts/results/show/components';

const ShowForecastResult = () => {
  const params = useParams();
  const resultId = params?.resultId as string;
  const { data, isLoading } = useTypeSafeQuery(
    ['getForecastResult', resultId],
    [resultId],
    {
      enabled: !!resultId,
    },
  );

  const selectedResult = useMemo(() => {
    return data?.result_items?.find(item => item.selected);
  }, [data]);

  const filterByNotSelected = () => {
    return data?.result_items?.filter(item => !item.selected);
  };

  return (
    <BasicContainer
      title={`Results of ${data?.execution.name}`}
      isLoading={isLoading}
      actions={
        <div className="flex justify-end gap-2">
          <ButtonLink
            to="/forecasts/results"
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
                Selected Result Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Selected result is the result with lower error.
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
                                Method
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {selectedResult?.method}
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
                                Projected Value
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {selectedResult?.value}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">
                                Forecast
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                <ButtonLink
                                  className="bg-indigo-100 text-xs text-indigo-700"
                                  to={`/forecasts/${data.forecast.id}`}
                                  leftIcon={
                                    <EyeIcon className="mr-2 h-5 w-5" />
                                  }
                                >
                                  {data.forecast.name}
                                </ButtonLink>
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

export default ShowForecastResult;
