import useAxios from "./useAxios";
const useMentorService = () => {
  const api = useAxios();
  const getAllMentors = async () => {
        return await api.get("/mentor/all/");
  };
  return { getAllMentors};
};
export default useMentorService;
