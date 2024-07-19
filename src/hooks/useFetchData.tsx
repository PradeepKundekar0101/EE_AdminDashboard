import { useState, useEffect, useCallback } from "react";
import useAxios from "./useAxios";
import { AxiosError } from "axios";

interface UseFetchData<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  fetchData: () => Promise<void>;
}

const useFetchData = <T,>(endpoint: string): UseFetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const axiosInstance = useAxios();

  const fetchData = useCallback(async () => {
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

  useEffect(() => {
    fetchData();
  }, [endpoint]); 

  return { data, loading, error, fetchData };
};

export default useFetchData;