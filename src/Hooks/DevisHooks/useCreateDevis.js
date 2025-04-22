import useSWRMutation from "swr/mutation";
import { PostFetcher } from "../../Config/SwrConfig";

const CreateDevis = async (url, { arg }) => {
  try {
    const response = await PostFetcher("devis/create", arg);
    return response;
  } catch (e) {
    throw e;
  }
};

const useCreateDevis = () => {
  const { data, trigger, error, isMutating } = useSWRMutation(
    "devis/create",
    CreateDevis
  );
  return {
    createDevis: trigger,
    error,
    isMutating,
    response: data,
  };
};
export default useCreateDevis;
