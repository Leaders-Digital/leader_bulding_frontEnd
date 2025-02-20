import useSWRMutation from "swr/mutation";
import { PostFetcher } from "../../Config/SwrConfig";

const addNote = async (url, { arg }) => {
  try {
    const { id, note } = arg;
    const res = await PostFetcher(`activity/addNote/${id}`, { note });
    return res;
  } catch (e) {
    throw e;
  }
};
const useAddNote = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    "/activity/addNote",
    addNote
  );
  return {
    addNote: trigger,
    error,
    isMutating,
  };
};
export default useAddNote;
