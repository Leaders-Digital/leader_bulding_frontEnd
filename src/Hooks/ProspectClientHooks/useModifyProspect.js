import useSWRMutation from "swr/mutation";
import { PutFetcher } from "../../Config/SwrConfig";

const ModifyProspect = async (url, { arg }) => {
  try {
    const { id } = arg;
    console.log("the send data from hook ", arg);
    const response = await PutFetcher(`prospect/update/${id}`, arg);
    console.log("response from the hook ", response);
    return response;
  } catch (e) {
    throw e;
  }
};
const UseModifyProspect = () => {
  const { trigger, error, isMutating, data } = useSWRMutation(
    "prospect/update",
    ModifyProspect
  );

  return {
    modifyProspect: trigger,
    error,
    isMutating,
    updatedProspect: data,
  };
};
export default UseModifyProspect;
