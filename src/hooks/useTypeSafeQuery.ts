import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  QueryKeys,
  PaginatedKey,
  QueryType,
  WrapperType,
} from '@/types/react-query.type';
import { useApi } from '@/hooks/useApi';

export const useTypeSafeQuery = <K extends QueryKeys>(
  key: K | PaginatedKey<K>,
  params?: Parameters<WrapperType['query'][K]> | undefined[] | undefined,
  opts?: UseQueryOptions,
) => {
  const con = useApi();

  return useQuery<QueryType<K>>(
    <QueryKey>key,
    () => {
      const fn = con.query[typeof key === 'string' ? key : key[0]] as any;
      if (typeof fn !== 'function') {
        throw new Error(`${key} is not a valid key for make a query`);
      }

      return fn(...(params || []));
    },
    {
      enabled: !!con,
      ...opts,
    } as any,
  );
};
