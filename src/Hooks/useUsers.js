import useSWR from "swr";
import { fetcher } from "../Config/SwrConfig";

const userUsers = (
  filter = "user",
  pagination = { current: 1, pageSize: 10 }
) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/getAllUsers?page=${pagination.current}&limit=${pagination.pageSize}&role=${filter}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    users: data?.data,
    error,
    isLoading,
    totalPages: data?.totalPages,
    totalItems: data?.totalItems,
  };
};
export default userUsers;
