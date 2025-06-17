import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useFile = (refId, modelType) => {
  const url = refId && modelType ? `/file/getFile/${refId}` : null;
  const { data, error, mutate, isLoading } = useSWR(url, fetcher);
console.log(data)
  return {
    file: data,
    error,
    mutate,
    isLoading,
  };
};
export default useFile;
