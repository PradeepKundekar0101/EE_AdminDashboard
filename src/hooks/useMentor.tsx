import useAxios from "./useAxios";
const useMentorService = () => {
  const api = useAxios();
  const getAllMentors = async () => {
        return await api.get("/mentor/all/");
  };
  const getAllTradersAssigned = async (mentorId:string) => {
    return await api.get("/mentor/allTraders/"+mentorId);
  };
  const getAllUnassignedTraders = async () => {
    return await api.get("/mentor/allUnassignedTraders/");
  };
  const assignTrader = async (userId:string,mentorId:string) => {
    return await api.post("/mentor/assignTrader/",{userId,mentorId});
  };
  const removeTrader = async (userId:string) => {
    return await api.post("/mentor/removeTrader/",{userId});
  };
  return { getAllMentors,getAllTradersAssigned,getAllUnassignedTraders,assignTrader,removeTrader};
};
export default useMentorService;
