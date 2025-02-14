import useSWRMutation from "swr/mutation";
import { PostFetcher } from "../../Config/SwrConfig";

const createActivity = async (url, { arg }) => {
  try {
    const reponse = await PostFetcher("activity/add", arg);
    return reponse;
  } catch (e) {
    throw e;
  }
};

const useCreateActivity = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    "/activity/create",
    createActivity
  );
  return {
    createActivity: trigger,
    error,
    isMutating,
  };
};
export default useCreateActivity;
