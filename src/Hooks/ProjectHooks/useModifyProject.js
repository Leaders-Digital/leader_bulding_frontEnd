import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../../Config/SwrConfig";

const ModifyProject = async (url, { arg }) => {
    try {
        const { id, data } = arg;

        const res = await PutFetcher(`project/update/${id}`, data);

        return res;
    } catch (e) {
        throw e;
    }
};

const useModifyProject = () => {
    const { data, trigger, error, isMutating } = useSWRMutation(
        "/update",
        ModifyProject
    );
    return {
        modifyProject: trigger,
        updatedProject: data,
        error,
        isMutating,
    };
};
export default useModifyProject;
