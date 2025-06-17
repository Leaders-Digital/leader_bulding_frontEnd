import useSWRMutation from "swr/mutation";
import { PostFetcher } from "../../Config/SwrConfig";

const becomeClient = async (url, { arg }) => {
  try {
    const response = await PostFetcher("admin/createUser", arg);
    return response;
  } catch (e) {
    throw e;
  }
};

const useBecomeClient = () => {
  const { data, trigger, error, isMutating } = useSWRMutation(
      "admin/createUser",
      becomeClient
  );

  return {
    becomeClient: trigger,
    response: data,
    error,
    isMutating,
  };
};
export default useBecomeClient;
