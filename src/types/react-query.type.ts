import { wrap } from '@/api';
import { QueryKey } from '@tanstack/react-query';

export type WrapperType = ReturnType<typeof wrap>;

export type QueryKeys = keyof ReturnType<typeof wrap>['query'];
export type MutationKeys = keyof ReturnType<typeof wrap>['mutation'];

export type Await<T> = T extends Promise<infer U> ? U : T;

export type PaginatedKey<K extends QueryKeys> = [
  K,
  ...(string | number | boolean | object | QueryKey)[],
];

export type QueryType<T extends QueryKeys> = Await<
  ReturnType<WrapperType['query'][T]>
>;

export type MutationType<T extends MutationKeys> = Await<
  ReturnType<WrapperType['mutation'][T]>
>;
