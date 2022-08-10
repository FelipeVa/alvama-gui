import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/form';

interface StatBlockPropsI {
  title: string;
  value: string | number;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  onClick?: () => void;
  feedback?: React.ReactNode;
  href?: string;
  buttonTitle?: string;
}

const StatBlock: FC<StatBlockPropsI> = ({
  title,
  value,
  onClick,
  href,
  feedback,
  buttonTitle,
  ...props
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
      <dt>
        <div className="absolute rounded-md bg-indigo-500 p-3">
          <props.icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">
          {title}
        </p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {feedback ? feedback : null}
        <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm">
            {onClick ? (
              <Button onClick={onClick}>
                {buttonTitle ?? 'View all'}
                <span className="sr-only"> {title} stats</span>
              </Button>
            ) : href ? (
              <Link
                to={href}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {buttonTitle ?? 'View all'}
                <span className="sr-only"> {title} stats</span>
              </Link>
            ) : null}
          </div>
        </div>
      </dd>
    </div>
  );
};

export default StatBlock;
