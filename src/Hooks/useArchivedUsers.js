import useSWR from "swr";
import { fetcher } from "../Config/SwrConfig";

const useArchivedUsers = (
  filter = "",
  pagination = { current: 1, pageSize: 10 }
) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/ArchivedUsers?page=${pagination.current}&limit=${
      pagination.pageSize
    }&role=${filter.role || ""}&search=${filter.search || ""}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    archivedUsers: data?.data,
    error,
    isLoading,
    totalPages: data?.totalPages,
    totalItems: data?.totalItems,
    mutate,
  };
};
export default useArchivedUsers;
