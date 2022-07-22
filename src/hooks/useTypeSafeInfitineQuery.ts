import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {
  Keys,
  PaginatedKey,
  QueryType,
  WrapperType,
} from '@/types/react-query.type';
import { useApi } from '@/hooks/useApi';

export const useTypeSafeInfiniteQuery = <K extends Keys>(
  key: K | PaginatedKey<K>,
  options?: UseInfiniteQueryOptions<QueryType<K>>,
  params?: Parameters<WrapperType['query'][K]> | (string | number)[],
) => {
  const con = useApi();

  return useInfiniteQuery<QueryType<K>>(
    <QueryKey>key,
    query => {
      const fn = con.query[typeof key === 'string' ? key : key[0]] as any;

      const parameters = (Array.isArray(params)
        ? params[0]
        : params) as unknown as Parameters<WrapperType['query'][K]>;

      return fn({
        ...query,
        ...(parameters || {}),
      });
    },
    {
      enabled: !!con,
      ...options,
    } as any,
  );
};
