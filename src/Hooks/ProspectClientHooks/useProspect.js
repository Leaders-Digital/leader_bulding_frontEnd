import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useProspect = (id) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `prospect/getById/${id}` : null,
    fetcher
  );

  return { prospect: data, error, isLoading, mutate };
};

export default useProspect;
