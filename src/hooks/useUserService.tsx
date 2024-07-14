
import useAxios from "./useAxios";
const useUserService = () => {
  const api = useAxios();
  const getAllUsers = async () => {
        return await api.get("/user/all/");
  };
  return { getAllUsers};
};
export default useUserService;
