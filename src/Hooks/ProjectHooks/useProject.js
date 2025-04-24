import { fetcher } from "../../Config/SwrConfig";
import useSWR from "swr";

const useProject = (id) => {
  const url = id ? `project/getById/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: true,
  });

  return {
    project: data,
    error,
    isLoading,
    mutate,
  };
};
export default useProject;
