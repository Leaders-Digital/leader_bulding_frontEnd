import useSWRMutation from "swr/mutation";
import { PostFetcher } from "../../Config/SwrConfig";

const createProspect = async (url, { arg }) => {
  try {
    const response = await PostFetcher("prospect/add", arg);
    return response;
  } catch (e) {
    throw e;
  }
};

const useCreateProspect = () => {
  const { data, trigger, error, isMutating } = useSWRMutation(
    "prospect/add",
    createProspect
  );

  return {
    createProspect: trigger,
    resposne: data,
    error,
    isMutating,
  };
};
export default useCreateProspect;
