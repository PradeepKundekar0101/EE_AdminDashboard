import { useState, useEffect, useCallback } from "react";
import useAxios from "./useAxios";
import { AxiosError } from "axios";
import debounce from 'lodash/debounce';

interface UseFetchData<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  fetchData: () => void;
}

const useFetchData = <T,>(endpoint: string, initialFetch: boolean = true): UseFetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const axiosInstance = useAxios();

  const fetchDataImpl = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<T>(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, [endpoint, axiosInstance]);

  const debouncedFetchData = useCallback(
    debounce(() => {
      fetchDataImpl();
    }, 500),
    [fetchDataImpl]
  );

  useEffect(() => {
    if (initialFetch) {
      debouncedFetchData();
    }
    return () => {
      debouncedFetchData.cancel();
    };
  }, [debouncedFetchData, initialFetch]);

  const fetchData = useCallback(() => {
    debouncedFetchData();
  }, [debouncedFetchData]);

  return { data, loading, error, fetchData };
};

export default useFetchData;