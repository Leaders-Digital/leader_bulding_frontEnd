import useSWR from "swr";
import { fetchBody } from "../../Config/SwrConfig";

const useMeetings = (
  filter = "",
  pagination = { current: 1, pageSize: 10 },
  id
) => {
  const { data, mutate, isLoading, error } = useSWR(
    [
      `meeting/getAllMeetings?page=${pagination.current}&limit=${pagination.pageSize}&prospectId=${id}`,
      filter,
    ],
    fetchBody,
    { revalidateOnFocus: false }
  );
  //console.log("data from the hook ", data);
  return {
    meetings: data?.meetings,
    error,
    isLoading,
    totalPages: data?.totalPages,
    totalItems: data?.totalItems,
    meetingsMutation: mutate,
  };
};
export default useMeetings;
