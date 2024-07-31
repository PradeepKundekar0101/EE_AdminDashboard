import { useState, useEffect, useCallback } from "react";
import useAxios from "./useAxios";
import { AxiosError } from "axios";
import { message } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";

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
  const dispatch = useAppDispatch();

  const axiosInstance = useAxios();
 
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<T>(endpoint);
        setData(response.data);
      } catch (err: any) {
        if(err.response?.status===401){
          message.error("Session expired, login again");
          dispatch(logout())
          window.location.reload()
        }
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