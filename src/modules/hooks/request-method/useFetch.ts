// import { useLoginSessionStore } from '@/store/useLoginStore';
import { service } from "../../utils/network/network";
import { AxiosError } from "axios";
import { useQuery, type QueryKey } from "react-query";

interface FetchOptions<TData = unknown, TParam = Record<string, unknown>> {
  params?: TParam;
  enabled?: boolean;
  refetchOnMount?: boolean | "always";
  onSuccess?: (data: TData) => void;
  responseType?: "blob";
  refetchOnWindowFocus?: boolean;
}

const FETCH_OPTIONS: FetchOptions = {
  enabled: true,
};

export const useFetch = <
  TQueryFnData = unknown,
  TParam = Record<string, unknown>,
>(
  queryKey: QueryKey,
  url: string,
  options: FetchOptions<TQueryFnData, TParam> = {},
) => {
  const { params, ...finalOptions } = {
    ...FETCH_OPTIONS,
    ...options,
  };

  function fetchData() {
    return (
      service
        // .get(`${BASE_URL}` + url, {
        .get(url, {
          params,
          responseType: finalOptions.responseType,
        })
        .then((res) => res.data)
    );
  }

  const { data, isLoading, error, refetch } = useQuery<
    TQueryFnData,
    AxiosError,
    TQueryFnData,
    QueryKey
  >(queryKey, fetchData, finalOptions);

  return { data, isLoading, error, refetch };
};
