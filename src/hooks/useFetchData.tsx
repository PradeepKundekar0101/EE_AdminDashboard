import { useState, useEffect } from "react";
import useAxios from "./useAxios";
import useDebounce from "./useDebounce";
import { AxiosError } from "axios";
interface UseFetchData<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  fetchData: () => {};
}
const useFetchData = <T,>(endpoint: string): UseFetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const axiosInstance = useAxios();
  const debouncedEndpoint = useDebounce(endpoint, 500); // Adjust the delay as needed
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<T>(debouncedEndpoint);
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!debouncedEndpoint) return;
    fetchData();
  }, [debouncedEndpoint]);
  return { data, loading, error, fetchData };
};
export default useFetchData;
