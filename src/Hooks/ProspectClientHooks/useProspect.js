import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useProspect = (id) => {
  const url = id ? `prospect/getById/${id}` : null; // Ensure correct pluralization
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnMount: true,
  });
  return { prospect: data, error, isLoading, mutate };
};

export default useProspect;
