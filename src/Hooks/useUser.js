import useSWR from "swr";
import { fetcher } from "../Config/SwrConfig";

const useCurrentUser = () => {
  const { data, isLoading, error } = useSWR("user/getCurrentUser", fetcher, {
    shouldRetryOnError: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};
export default useCurrentUser;
