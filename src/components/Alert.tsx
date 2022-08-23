import React, { FC } from 'react';
import clsx from '@/utils/clsx';

interface AlertPropsI {
  children: React.ReactNode;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  className?: string;
}

const Alert: FC<AlertPropsI> = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx('mb-4 flex rounded-lg p-4 text-sm ', className)}
      role="alert"
    >
      {props.icon ? (
        <props.icon
          className="mr-3 inline h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
      ) : null}
      <span className="sr-only">Info</span>
      <div>{children}</div>
    </div>
  );
};

export default Alert;
