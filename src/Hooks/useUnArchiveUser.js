import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../Config/SwrConfig";

const unArchiveUser = async (url, { arg }) => {
  try {
    const { id } = arg;
    const response = await PutFetcher(`admin/unArchivedUser/${id}`);
    return response;
  } catch (e) {
    throw e;
  }
};

const useUnArchiveUser = () => {
  const { data, error, isMutating, trigger } = useSWRMutation(
    "/archiveUser",
    unArchiveUser
  );

  return {
    archivedUser: data,
    error,
    isMutating,
    unarchive: trigger,
  };
};
export default useUnArchiveUser;
