import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useUpcomingActivities = (
  pagination = { current: 1, pageSize: 10 },
  id
) => {
  const { data, mutate, isLoading, error } = useSWR(
    `activity/getAll?page=${pagination.current}&limit=${pagination.pageSize}&id=${id}&dateFilter=upcoming`,
    fetcher
  );
  console.log("data from upcoming fetcher", data);
  if (error) {
    console.log("error from fetcher", error);
  }
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
