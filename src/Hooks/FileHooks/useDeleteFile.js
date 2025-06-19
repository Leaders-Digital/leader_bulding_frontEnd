import useSWRMutation from "swr/mutation";
import { DeleteFetcher } from "../../Config/SwrConfig";

const deleteFile = async (url, { arg }) => {
  try {
    const { id } = arg;
    const response = await DeleteFetcher(`file/delete/${id}`);
    return response;
  } catch (e) {
    throw e;
  }
};

const useDeleteFile = () => {
  const { data, trigger, error, isMutating } = useSWRMutation(
    "file/delete",
    deleteFile
  );

  return {
    deleteFile: trigger,
    data,
    error,
    isMutating,
  };
};

export default useDeleteFile; 