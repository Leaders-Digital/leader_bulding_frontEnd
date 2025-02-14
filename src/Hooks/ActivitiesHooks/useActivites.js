import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useActivites = (id) => {
  const { isLoading, data, error, mutate } = useSWR(
    `activity/getAll/${id}`,
    fetcher
  );

  return {
    activities: data,
    error,
    isLoading,
    activitiesMutation: mutate,
  };
};
export default useActivites;
