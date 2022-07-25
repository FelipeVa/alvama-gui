import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(relativeTime);
dayjs.extend(calendar);

interface NumberFormatOptions {
  localeMatcher?: string | undefined;
  style?: string | undefined;
  currency?: string | undefined;
  currencySign?: string | undefined;
  useGrouping?: boolean | undefined;
  minimumIntegerDigits?: number | undefined;
  minimumFractionDigits?: number | undefined;
  maximumFractionDigits?: number | undefined;
  minimumSignificantDigits?: number | undefined;
  maximumSignificantDigits?: number | undefined;
}

export const fromNow = (date: string | Date) => {
  return dayjs(date).fromNow();
};

export const toCalendar = (date: string | Date) => {
  return dayjs(date).calendar();
};

export const toUSD = (value: number, options?: NumberFormatOptions) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    ...options,
  });

  return formatter.format(value);
};
