import { PostFetcher } from "../../Config/SwrConfig";
import useSWRMutation from "swr/mutation";

const createProject = async (url, { arg }) => {
  try {
    const response = await PostFetcher("project/create", arg);
    console.log("resposne hook", response);
    return response;
  } catch (e) {
    throw e;
  }
};

const useCreateProject = () => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    "project/create",
    createProject
  );
  return {
    createProject: trigger,
    response: data,
    error,
    isMutating,
  };
};
export default useCreateProject;
