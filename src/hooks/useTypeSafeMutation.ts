import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Await, WrapperType } from '@/types/react-query.type';
import { useApi } from '@/hooks/useApi';

type Keys = keyof WrapperType['mutation'];

export const useTypeSafeMutation = <K extends Keys>(
  key: K,
  opts?: UseMutationOptions<
    Await<WrapperType['mutation'][K]>,
    any,
    Parameters<WrapperType['mutation'][K]>,
    any
  >,
) => {
  const con = useApi();

  return useMutation<
    Await<WrapperType['mutation'][K]>,
    any,
    Parameters<WrapperType['mutation'][K]>
  >(
    params =>
      (con.mutation[typeof key === 'string' ? key : key[0]] as any)(...params),
    opts,
  );
};
