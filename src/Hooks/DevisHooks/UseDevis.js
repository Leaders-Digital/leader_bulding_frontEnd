import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useDevis = (filter = {}, pagination = { current: 1, pageSize: 10 }) => {
  const { data, isLoading, error, mutate } = useSWR(
    `devis/getall?page=${pagination.current}&limit=${
      pagination.pageSize
    }&search=${filter.search || ""}&select=${filter.status || ""}`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );
  return {
    devis: data?.data,
    totalItems: data?.totalItems,
    totalPages: data?.totalPages,
    isLoading,
    mutate,
  };
};
export default useDevis;
