import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../Config/SwrConfig";

const DeleteUser = async (url, { arg }) => {
  try {
    const { id } = arg;
    const response = await PutFetcher(`admin/deleteUser/${id}`);

    return response;
  } catch (e) {
    throw e;
  }
};

const UseDeleteUser = () => {
  const { data, trigger, error, isMutating } = useSWRMutation(
    "user/delete",
    DeleteUser
  );

  return {
    deleteUser: trigger,
    data,
    error,
    isMutating,
  };
};
export default UseDeleteUser;
