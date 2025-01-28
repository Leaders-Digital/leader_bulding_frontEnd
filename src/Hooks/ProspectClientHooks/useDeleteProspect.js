import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../../Config/SwrConfig";

const deleteProspect = async (url, { arg }) => {
  try {
    const { id } = arg;
    const res = await PutFetcher(`prospect/delete/${id}`);
    return res;
  } catch (e) {
    throw e;
  }
};
const useDeleteProspect = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "prospect/delete",
    deleteProspect
  );
  return {
    deleteProspect: trigger,
    data,
    isMutating,
    error,
  };
};
export default useDeleteProspect;
