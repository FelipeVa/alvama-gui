import React, { FC, useEffect, useMemo, useState } from 'react';
import { BasicContainer } from '@/components/layouts';
import {
  StatBlock,
  LastTenDatasetResultTable,
  LastTenForecastResultTable,
} from '@/pages/home/components';
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  CurrencyDollarIcon,
  TruckIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import { useTypeSafeQuery } from '@/hooks/useTypeSafeQuery';
import clsx from '@/utils/clsx';
import { toUSD } from '@/utils/common';
import { Select } from '@/components';

interface StatBlockPercentageOfBusUtilizationPropsI {
  value: number;
}

const StatBlockPercentageOfBusUtilization: FC<
  StatBlockPercentageOfBusUtilizationPropsI
> = ({ value }) => {
  return (
    <p
      className={clsx(
        value <= 100 ? 'text-green-600' : 'text-red-600',
        'ml-2 flex items-baseline text-sm font-semibold',
      )}
    >
      {value <= 100 ? (
        <ArrowSmUpIcon
          className="h-5 w-5 flex-shrink-0 self-center text-green-500"
          aria-hidden="true"
        />
      ) : (
        <ArrowSmDownIcon
          className="h-5 w-5 flex-shrink-0 self-center text-red-500"
          aria-hidden="true"
        />
      )}
      <span className="ml-1">{value > 100 ? 'Over Utilization' : 'Good'}</span>
    </p>
  );
};

const Home = () => {
  const [selectedResultId, setSelectedResultId] = useState<
    number | string | undefined
  >(undefined);

  const { data: datasetResults, isLoading } = useTypeSafeQuery([
    'getDatasetResults',
  ]);

  const { data: datasetResult, isLoading: isLoadingDatasetResultStat } =
    useTypeSafeQuery(
      ['getDatasetResultStats', selectedResultId as unknown as number],
      [selectedResultId as unknown as string],
      {
        enabled: !!selectedResultId,
      },
    );

  const { data: lastTenResults, isLoading: isLoadingLastTenResultStats } =
    useTypeSafeQuery(['getLastTenResults']);

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
      isLoading={isLoading || isLoadingDatasetResultStat}
      actions={
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
      }
    >
      <div>
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
        <div className="mt-8 grid grid-flow-col grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Last 10 dataset results
            </h3>
            <LastTenDatasetResultTable data={lastTenResults?.dataset_results} />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Last 10 forecast results
            </h3>
            <LastTenForecastResultTable
              data={lastTenResults?.forecast_results}
            />
          </div>
        </div>
      </div>
    </BasicContainer>
  );
};

export default Home;
