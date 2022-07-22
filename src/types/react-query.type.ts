import { wrap } from '@/api';
import { QueryKey } from '@tanstack/react-query';

export type WrapperType = ReturnType<typeof wrap>;

export type Keys = keyof ReturnType<typeof wrap>['query'];

export type Await<T> = T extends Promise<infer U> ? U : T;

export type PaginatedKey<K extends Keys> = [
  K,
  ...(string | number | boolean | object | QueryKey)[],
];

export type QueryType<T extends Keys> = Await<
  ReturnType<WrapperType['query'][T]>
>;
