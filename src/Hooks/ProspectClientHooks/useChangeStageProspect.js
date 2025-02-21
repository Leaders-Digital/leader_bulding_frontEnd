import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../../Config/SwrConfig";

const changeStatus = async (url, { arg }) => {
  try {
    const { id, status, stage } = arg;
    const requestData = { stage: stage, status: status };

    const res = await PutFetcher(`prospect/changeStage/${id}`, requestData);
    return res;
  } catch (e) {
    throw e;
  }
};

const useChangeStageProspect = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/changeStatus",
    changeStatus
  );
  return {
    changeStage: trigger,
    error,
    isMutating,
  };
};
export default useChangeStageProspect;
