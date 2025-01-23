import useSWRMutation from "swr/mutation";
import { PostFetcher } from "../Config/SwrConfig";

const CreateUser = async (url, { arg }) => {
  try {
    const response = await PostFetcher("admin/createUser", arg);

    return response;
  } catch (e) {
    throw e;
  }
};

const UseCreateUser = () => {
  const { trigger, isMutating, error, data } = useSWRMutation(
    "/createUser",
    CreateUser
  );
  return {
    createUser: trigger,
    isMutating,
    error,
    data,
  };
};
export default UseCreateUser;
