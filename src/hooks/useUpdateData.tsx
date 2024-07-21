import { useState } from 'react';
import useAxios from './useAxios';
import { AxiosError, AxiosResponse } from 'axios';

interface UseUpdateData<T, R> {
  data: R | null;
  loading: boolean;
  error: AxiosError | null;
  putData: (data: T) => Promise<R>;
}

const useUpdateData = <T, R>(endpoint: string): UseUpdateData<T, R> => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const axiosInstance = useAxios();

  const putData = async (putData: T): Promise<R> => {
    setLoading(true);
    try {
      const response: AxiosResponse<R> = await axiosInstance.put<R>(endpoint, putData);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err as AxiosError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, putData };
};

export default useUpdateData;