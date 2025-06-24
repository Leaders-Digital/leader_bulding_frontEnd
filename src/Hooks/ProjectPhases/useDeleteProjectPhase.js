import useSWRMutation from "swr/mutation";
import { DeleteFetcher } from "../../Config/SwrConfig";

const DeleteProjectPhase = async (url, { arg }) => {
    try {
        const response = await DeleteFetcher(`projectPhase/delete/${arg}`);
        return response;
    } catch (e) {
        throw e;
    }
};

const useDeleteProjectPhase = () => {
    const { data, trigger, error, isMutating } = useSWRMutation(
        "projectPhase/delete",
        DeleteProjectPhase
    );

    return {
        deleteProjectPhase: trigger,
        data,
        error,
        isMutating,
    };
};

export default useDeleteProjectPhase; 