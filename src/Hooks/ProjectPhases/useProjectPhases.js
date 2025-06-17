import useSWR from 'swr';
import { fetcher } from "../../Config/SwrConfig";
import useCreateProjectPhase from './useCreateProjectPhase';
import useUpdateProjectPhase from './useUpdateProjectPhase';

const useProjectPhases = () => {
    const { data, error, mutate } = useSWR('projectPhase/getAll', fetcher);
    const {
        createProjectPhase, 
        isMutating: isCreating 
    } = useCreateProjectPhase();

    const { 
        updateProjectPhase, 
        isMutating: isUpdating 
    } = useUpdateProjectPhase();

    const loading = isCreating || isUpdating || (!data && !error);

    return {
        data: data || [],
        loading,
        error,
        refetch: mutate,
        createProjectPhase,
        updateProjectPhase
    };
};

export default useProjectPhases; 