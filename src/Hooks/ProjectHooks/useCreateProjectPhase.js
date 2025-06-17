import useSWRMutation from "swr/mutation";
import { PostFetcher } from "../../Config/SwrConfig";

const createProjectPhase = async (url, { arg }) => {
  try {
    const response = await PostFetcher("projectPhase/create", arg);
    return response;
  } catch (e) {
    throw e;
  }
};

const useCreateProjectPhase = () => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    "projectPhase/create",
    createProjectPhase
  );
  return {
    createProjectPhase: trigger,
    response: data,
    error,
    isMutating,
  };
};

export default useCreateProjectPhase; 