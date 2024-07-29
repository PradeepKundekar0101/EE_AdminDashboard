
import useAxios from "./useAxios";
const useQuestionsService = () => {
  const api =  useAxios();
  const getAllQuestions = async () => {
        return await api.get("/question/");
  };
  return { getAllQuestions};
};
export default useQuestionsService;
