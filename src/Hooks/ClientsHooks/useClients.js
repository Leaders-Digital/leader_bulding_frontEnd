import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useClients = (filter = "", pagination = { current: 1, pageSize: 10 }) => {
  const { data, isLoading, error, mutate } = useSWR(
    `admin/getAllClients?page=${pagination.current}&limit=${
      pagination.pageSize
    }&search=${filter.search || ""}&select=${filter.status}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    clients: data?.data,
    totalItems: data?.totalItems,
    totalPages: data?.totalPages,
    isLoading,
    error,
    mutate,
  };
};
export default useClients;
