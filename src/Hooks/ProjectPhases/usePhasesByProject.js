import useSWR from 'swr';
import { fetcher } from "../../Config/SwrConfig";

const usePhasesByProject = (projectId) => {
    const { data, error, isLoading, mutate } = useSWR(
        projectId ? `projectPhase/getPhasesByProjectId/${projectId}` : null,
        fetcher
    );

    return {
        phases: data?.data || [],
        loading: isLoading,
        error,
        refetch: mutate
    };
};

export default usePhasesByProject; 