import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  MutationKeys,
  MutationType,
  WrapperType,
} from '@/types/react-query.type';
import { useApi } from '@/hooks/useApi';

export const useTypeSafeMutation = <K extends MutationKeys>(
  key: K,
  opts?: UseMutationOptions<
    MutationType<K>,
    any,
    Parameters<WrapperType['mutation'][K]>,
    any
  >,
) => {
  const con = useApi();

  return useMutation<
    MutationType<K>,
    any,
    Parameters<WrapperType['mutation'][K]>
  >(
    params =>
      (con.mutation[typeof key === 'string' ? key : key[0]] as any)(...params),
    opts,
  );
};
