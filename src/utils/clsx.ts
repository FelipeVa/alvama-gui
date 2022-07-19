import _clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const clsx = (...inputs: ClassValue[]) => {
  return twMerge(_clsx(...inputs));
};

export default clsx;
