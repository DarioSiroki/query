import { QueryObserver } from '@tanstack/query-core'
import { useBaseQuery } from './useBaseQuery'
import type { ToRefs } from 'vue-demi'
import type {
  DefinedQueryObserverResult,
  QueryFunction,
  QueryKey,
  QueryObserverResult,
} from '@tanstack/query-core'
import type { UseQueryReturnType as UQRT } from './useBaseQuery'
import type {
  DeepUnwrapRef,
  DistributiveOmit,
  MaybeRef,
  VueQueryObserverOptions,
  WithQueryClientKey,
} from './types'

export type UseQueryReturnType<TData, TError> = DistributiveOmit<
  UQRT<TData, TError>,
  'refetch' | 'remove'
> & {
  refetch: QueryObserverResult<TData, TError>['refetch']
  remove: QueryObserverResult<TData, TError>['remove']
}

export type UseQueryDefinedReturnType<TData, TError> = DistributiveOmit<
  ToRefs<Readonly<DefinedQueryObserverResult<TData, TError>>>,
  'refetch' | 'remove'
> & {
  suspense: () => Promise<QueryObserverResult<TData, TError>>
  refetch: QueryObserverResult<TData, TError>['refetch']
  remove: QueryObserverResult<TData, TError>['remove']
}

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = WithQueryClientKey<
  VueQueryObserverOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>
>

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: MaybeRef<
    Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'initialData'
    > & { initialData?: () => undefined }
  >,
): UseQueryReturnType<TData, TError>

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: MaybeRef<
    Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'initialData'
    > & { initialData: TQueryFnData | (() => TQueryFnData) }
  >,
): UseQueryDefinedReturnType<TData, TError>

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: MaybeRef<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>>,
): UseQueryReturnType<TData, TError>

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: MaybeRef<TQueryKey>,
  options?: MaybeRef<
    Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'initialData'
    > & { initialData?: () => undefined }
  >,
): UseQueryReturnType<TData, TError>

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: MaybeRef<TQueryKey>,
  options?: MaybeRef<
    Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'initialData'
    > & { initialData: TQueryFnData | (() => TQueryFnData) }
  >,
): UseQueryDefinedReturnType<TData, TError>

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: MaybeRef<TQueryKey>,
  options?: MaybeRef<
    Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'>
  >,
): UseQueryReturnType<TData, TError>

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: MaybeRef<TQueryKey>,
  queryFn: MaybeRef<QueryFunction<TQueryFnData, DeepUnwrapRef<TQueryKey>>>,
  options?: MaybeRef<
    Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn' | 'initialData'
    > & { initialData?: () => undefined }
  >,
): UseQueryReturnType<TData, TError>

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: MaybeRef<TQueryKey>,
  queryFn: MaybeRef<QueryFunction<TQueryFnData, DeepUnwrapRef<TQueryKey>>>,
  options?: MaybeRef<
    Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn' | 'initialData'
    > & { initialData: TQueryFnData | (() => TQueryFnData) }
  >,
): UseQueryDefinedReturnType<TData, TError>

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: MaybeRef<TQueryKey>,
  queryFn: MaybeRef<QueryFunction<TQueryFnData, DeepUnwrapRef<TQueryKey>>>,
  options?: MaybeRef<
    Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn'
    >
  >,
): UseQueryReturnType<TData, TError>

export function useQuery<
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  arg1:
    | MaybeRef<TQueryKey>
    | MaybeRef<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>>,
  arg2?:
    | MaybeRef<QueryFunction<TQueryFnData, DeepUnwrapRef<TQueryKey>>>
    | MaybeRef<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>>,
  arg3?: MaybeRef<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>>,
):
  | UseQueryReturnType<TData, TError>
  | UseQueryDefinedReturnType<TData, TError> {
  const result = useBaseQuery(QueryObserver, arg1, arg2, arg3)

  return {
    ...result,
    refetch: result.refetch.value,
    remove: result.remove.value,
  }
}
