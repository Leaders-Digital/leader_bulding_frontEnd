import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../../Config/SwrConfig";

const markAsdone = async (url, { arg }) => {
  try {
    const { id, data } = arg;
    const res = await PutFetcher(`activity/markAsDone/${id}`, data);

    return res;
  } catch (e) {
    throw e;
  }
};

const useMarkasdone = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    "activity/markAsDone",
    markAsdone
  );

  return {
    markAsdone: trigger,
    error,
    isMutating,
  };
};
export default useMarkasdone;
