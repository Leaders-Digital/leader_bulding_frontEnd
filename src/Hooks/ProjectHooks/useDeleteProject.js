import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../../Config/SwrConfig";
import { mutate } from "swr";

const DeleteProject = async (url, { arg }) => {
    try {
        const { id } = arg;
        const response = await PutFetcher(`project/delete/${id}`);

        return response;
    } catch (e) {
        throw e;
    }
};

const UseDeleteUser = () => {
    const { data, trigger, error, isMutating } = useSWRMutation(
        "project/delete",
        DeleteProject,
        {
            onSuccess: () => {
                // Invalidate all project cache entries to ensure fresh data
                mutate((key) => typeof key === 'string' && key.startsWith('project/getAll'));
                
                // Also invalidate any cache entries that might contain project data
                mutate((key) => typeof key === 'string' && key.includes('project'));
            }
        }
    );

    return {
        deleteProject: trigger,
        data,
        error,
        isMutating,
    };
};
export default UseDeleteUser;
