import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../../Config/SwrConfig";


const UpdateProjectPhase = async (url, { arg }) => {
    try {
        const { id, data } = arg;
        const response = await PutFetcher(`projectPhase/update/${id}`, data);
        return response;
    } catch (e) {
        throw e;
    }
};

const useUpdateProjectPhase = () => {
    const { data, trigger, error, isMutating } = useSWRMutation(
        "projectPhase/update",
        UpdateProjectPhase
    );

    return {
        updateProjectPhase: trigger,
        data,
        error,
        isMutating,
    };
};

export default useUpdateProjectPhase; 