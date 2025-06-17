import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../../Config/SwrConfig";

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
        DeleteProject
    );

    return {
        deleteProject: trigger,
        data,
        error,
        isMutating,
    };
};
export default UseDeleteUser;
