import { useState } from 'react';
import useAxios from './useAxios';
import { AxiosError, AxiosResponse } from 'axios';

interface UsePostData<T, R> {
  data: R | null;
  loading: boolean;
  error: AxiosError | null;
  postData: (data: T) => Promise<void>;
}

const usePostData = <T, R>(endpoint: string): UsePostData<T, R> => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const axiosInstance = useAxios();

  const postData = async (postData: T) => {
    setLoading(true);
    try {
      const response: AxiosResponse<R> = await axiosInstance.post<R>(endpoint, postData);
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePostData;
