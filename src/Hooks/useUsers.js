import useSWR from "swr";
import { fetcher } from "../Config/SwrConfig";

const userUsers = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "admin/getAllUsers",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    users: data,
    error,
    isLoading,
  };
};
export default userUsers;
