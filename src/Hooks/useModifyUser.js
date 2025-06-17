import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../Config/SwrConfig";

const ModifyUser = async (url, { arg }) => {
  try {
    const { id, data } = arg;
    const res = await PutFetcher(`admin/updateUser/${id}`, data);

    return res;
  } catch (e) {
    throw e;
  }
};

const useModifyUser = () => {
  const { data, trigger, error, isMutating } = useSWRMutation(
    "/modifyUser",
    ModifyUser
  );

  return {
    modifyUser: trigger,
    updatedUser: data,
    error,
    isMutating,
  };
};

export default useModifyUser;




