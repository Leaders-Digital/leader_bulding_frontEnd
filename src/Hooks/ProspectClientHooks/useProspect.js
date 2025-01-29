import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useProspect = (id) => {
  const { data, error, isLoading } = useSWR(
    id ? `prospect/getById/${id}` : null,
    fetcher
  );

  return { prospect: data, error, isLoading };
};

export default useProspect;
