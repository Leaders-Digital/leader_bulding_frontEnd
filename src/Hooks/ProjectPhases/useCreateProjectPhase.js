import useSWRMutation from "swr/mutation";
import { PostFetcher } from "../../Config/SwrConfig";

const CreateProjectPhase = async (url, { arg }) => {
    try {
        const response = await PostFetcher(`projectPhase/create`, arg);
        return response;
    } catch (e) {
        throw e;
    }
};

const useCreateProjectPhase = () => {
    const { data, trigger, error, isMutating } = useSWRMutation(
        "projectPhase/create",
        CreateProjectPhase
    );

    return {
        createProjectPhase: trigger,
        data,
        error,
        isMutating,
    };
};

export default useCreateProjectPhase; 