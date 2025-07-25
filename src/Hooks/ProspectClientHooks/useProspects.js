import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useProspects = (
  filter = "",
  pagination = { current: 1, pageSize: 10 }
) => {
  const { data, isLoading, error, mutate } = useSWR(
    `prospect/getAll?page=${pagination.current}&limit=${
      pagination.pageSize
    }&search=${filter.search || ""}&select=${filter.status}`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );
//console.log("prospects from the hook ", data);
  return {
    prospects: data?.data,
    totalItems: data?.totalItems,
    totalPages: data?.totalPages,
    isLoading,
    error,
    mutate,
  };
};
export default useProspects;
