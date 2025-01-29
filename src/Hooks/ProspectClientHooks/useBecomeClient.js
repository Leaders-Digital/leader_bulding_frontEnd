import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../../Config/SwrConfig";

const becomeClient = async (url, { arg }) => {
  try {
    const { id, data } = arg;
    console.log("arg", arg);
    const res = await PutFetcher(`prospect/changeProspectType/${id}`, data);
    return res;
  } catch (e) {
    throw e;
  }
};

const useBecomeClient = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "prospect/changeProspectType",

    becomeClient
  );
  return {
    validerClient: trigger,
    data,
    error,
    isMutating,
  };
};
export default useBecomeClient;
