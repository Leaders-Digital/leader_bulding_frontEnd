import useSWR from "swr";
import { fetcher } from "../../Config/SwrConfig";

const useProjects = (
  filter = {},
  pagination = { current: 1, pageSize: 10 }
) => {
  // Create a proper cache key that includes all parameters
  const cacheKey = `project/getAll?page=${pagination.current}&limit=${pagination.pageSize}&search=${encodeURIComponent(filter.search || "")}&status=${encodeURIComponent(filter.status || "")}`;
  
  console.log('useProjects - Cache key:', cacheKey);
  console.log('useProjects - Pagination:', pagination);
  console.log('useProjects - Filter:', filter);
  
  const { data, isLoading, error, mutate } = useSWR(
    cacheKey,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
      revalidateOnMount: true,
      dedupingInterval: 0, // Disable deduplication to ensure fresh data
    }
  );
  
  return {
    projects: data?.data || [],
    totalItems: data?.totalItems || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    mutate,
  };
};

export default useProjects;
