import { useState, useEffect } from 'react';
import useAxios from './useAxios';
import { AxiosError } from 'axios';

interface UseFetchData<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

const useFetchData = <T,>(endpoint: string): UseFetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<T>(endpoint);
        setData(response.data);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetchData;
