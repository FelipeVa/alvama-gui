import React, { useEffect, useMemo, useState } from 'react';
import { BasicContainer } from '@/components/layouts';
import {
  LastTenDatasetResultTable,
  LastTenForecastResultTable,
  StatBlock,
  StatBlockPercentageOfBusUtilization,
} from '@/pages/home/components';
import {
  CurrencyDollarIcon,
  DocumentIcon,
  TruckIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import { toUSD } from '@/utils/common';
import { Empty, Select } from '@/components';
import clsx from '@/utils/clsx';

const Home = () => {
  const [selectedResultId, setSelectedResultId] = useState<
    number | string | undefined
  >('');

  const { data: datasetResults, isLoading } = useTypeSafeQuery([
    'getDatasetResults',
  ]);

  const { data: datasetResult } = useTypeSafeQuery(
    ['getDatasetResultStats', selectedResultId as unknown as number],
    [selectedResultId as unknown as string],
    {
      enabled: !!selectedResultId,
    },
  );

  const { data: lastTenResults } = useTypeSafeQuery(['getLastTenResults']);

  useEffect(() => {
    if (datasetResults?.length) {
      setSelectedResultId(datasetResults[0]?.id);
    }
  }, [datasetResults]);

  const percentageOfBusUtilization = useMemo(() => {
    if (!datasetResult) {
      return 0;
    }

    return (
      (datasetResult.buses_to_be_used / datasetResult.amount_of_buses) * 100
    );
  }, [datasetResult]);

  const onChangeSelectedResult = (value: string | any) => {
    if (value === '') {
      return;
    }

    setSelectedResultId(value);
  };

  return (
    <BasicContainer
      title="Dashboard"
      isLoading={isLoading}
      actions={
        lastTenResults?.dataset_results.length ? (
          <div className="w-1/4">
            <Select
              value={selectedResultId}
              items={[
                {
                  label: 'Select a result',
                  value: '',
                },
                ...(datasetResults?.map(result => {
                  return {
                    label: result.execution.name,
                    value: result.id,
                  };
                }) ?? [
                  {
                    label: 'Loading...',
                    value: '',
                  },
                ]),
              ]}
              onChange={onChangeSelectedResult}
            />
          </div>
        ) : null
      }
    >
      <div>
        {datasetResult ? (
          <>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Last result for execution: {datasetResult?.name}
            </h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <StatBlock
                icon={UsersIcon}
                title="Total of passengers"
                value={datasetResult?.demand_of_routes ?? 0}
                href={`/datasets/results/${selectedResultId}`}
                buttonTitle="See details"
              />
              <StatBlock
                icon={TruckIcon}
                title="% of bus utilization"
                value={percentageOfBusUtilization.toFixed(2)}
                feedback={
                  <StatBlockPercentageOfBusUtilization
                    value={percentageOfBusUtilization}
                  />
                }
                href={`/datasets/results/${selectedResultId}`}
                buttonTitle="See details"
              />
              <StatBlock
                icon={CurrencyDollarIcon}
                title="Total of costs"
                value={toUSD(datasetResult?.objective ?? 0)}
                href={`/datasets/results/${selectedResultId}`}
                buttonTitle="See details"
              />
            </dl>
          </>
        ) : null}
        {lastTenResults?.dataset_results.length ||
        lastTenResults?.forecast_results.length ? (
          <div className="mt-8 grid grid-flow-col grid-cols-2 gap-4">
            {lastTenResults?.dataset_results.length ? (
              <div
                className={clsx('space-y-4', {
                  'col-span-2': !lastTenResults?.forecast_results.length,
                })}
              >
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Last 10 dataset results
                </h3>
                <LastTenDatasetResultTable
                  data={lastTenResults?.dataset_results}
                />
              </div>
            ) : null}

            {lastTenResults?.forecast_results.length ? (
              <div
                className={clsx('space-y-4', {
                  'col-span-2': !lastTenResults?.dataset_results.length,
                })}
              >
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Last 10 forecast results
                </h3>
                <LastTenForecastResultTable
                  data={lastTenResults?.forecast_results}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        {!lastTenResults?.dataset_results.length &&
        !lastTenResults?.forecast_results.length ? (
          <Empty
            title="There are no results yet"
            icon={<DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />}
          />
        ) : null}
      </div>
    </BasicContainer>
  );
};

export default Home;
