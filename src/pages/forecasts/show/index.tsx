import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { Button, ButtonLink } from '@/components/form';
import {
  ArrowLeftIcon,
  CalendarIcon,
  HashtagIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { toCalendar } from '@/utils/common';
import { BasicContainer } from '@/components/layouts';
import { ForecastItemsTable } from '@/pages/forecasts/show/components';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import { useNotifier } from '@/hooks/useNotifier';

const ShowForecast = () => {
  const notifier = useNotifier();
  const params = useParams();
  const forecastId = params.forecastId as string;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useTypeSafeQuery(
    ['getForecast', forecastId],
    [forecastId],
    {
      enabled: !!forecastId,
    },
  );

  const { mutate } = useTypeSafeMutation('destroyForecast', {
    onSuccess: () => {
      notifier.notify({
        title: 'Forecast deleted',
        message: 'The forecast has been deleted successfully.',
      });
      navigate('/forecasts');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getForecasts']);
    },
  });

  const onDestroyForecast = () => {
    mutate([forecastId]);
  };

  return (
    <BasicContainer
      title={`Forecast - ${data?.name}`}
      isLoading={isLoading}
      actions={
        <div className="flex justify-end gap-2">
          <ButtonLink
            to="/forecasts"
            className="bg-indigo-100 text-sm text-indigo-700"
            leftIcon={<ArrowLeftIcon className="mr-2 h-5 w-5" />}
          >
            Go back
          </ButtonLink>
          <Button
            className="bg-red-600 text-sm"
            onClick={onDestroyForecast}
            isLoading={isLoading}
            leftIcon={<TrashIcon className="mr-2 h-5 w-5" />}
          >
            Delete Forecast
          </Button>
        </div>
      }
      description={
        <>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <HashtagIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {data?.items.length ?? 0} Items
            </div>
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
                General information about the forecast.
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
                                Name
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {data.name}
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
            <ForecastItemsTable items={data.items} />
          </div>
        </div>
      ) : null}
    </BasicContainer>
  );
};

export default ShowForecast;
