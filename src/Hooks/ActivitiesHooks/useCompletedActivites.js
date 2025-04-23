import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useCompletedActivites = (
  pagination = { current: 1, pageSize: 10 },
  id
) => {
  const { data, mutate, isLoading, error } = useSWR(
    `activity/getAll?page=${pagination.current}&limit=${pagination.pageSize}&id=${id}&dateFilter=completed`,
    fetcher
  );

  return {
    activities: data?.data,
    error,
    isLoading,
    totalPages: data?.totalPages,
    totalItems: data?.totalItems,
    mutate,
  };
};
export default useCompletedActivites;
