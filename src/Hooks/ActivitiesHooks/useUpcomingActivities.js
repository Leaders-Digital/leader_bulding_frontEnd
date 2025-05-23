import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useUpcomingActivities = (
  pagination = { current: 1, pageSize: 10 },
  id
) => {
  const cacheKey = id ? [`activity/getAll`, id, pagination] : null;
  
  const { data, mutate, isLoading, error } = useSWR(
    cacheKey,
    () => fetcher(`activity/getAll?page=${pagination.current}&limit=${pagination.pageSize}&id=${id}&dateFilter=upcoming`)
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
export default useUpcomingActivities;
