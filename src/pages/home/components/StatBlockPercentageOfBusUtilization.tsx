import React, { FC } from 'react';
import clsx from '@/utils/clsx';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline';

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

export default StatBlockPercentageOfBusUtilization;
