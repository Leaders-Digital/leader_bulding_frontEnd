import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useProjects = (
  filter = {},
  pagination = { current: 1, pageSize: 10 }
) => {
  const { data, isLoading, error, mutate } = useSWR(
    `project/getAll?page=${pagination.current}&limit=${
      pagination.pageSize
    }&search=${filter.search || ""}&select=${filter.status || ""}`,
    fetcher,
    {
      revalidateOnFocus: true,

      revalidateOnReconnect: true,
    }
  );
  return {
    projects: data?.data,
    totalItems: data?.totalItems,
    totalPages: data?.totalPages,
    isLoading,
    mutate,
  };
};
export default useProjects;
