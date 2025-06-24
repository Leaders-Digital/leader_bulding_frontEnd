import useSWR from "swr";
import {fetcher} from "../Config/SwrConfig";

const userUsers = (filter = "", pagination = {current: 1, pageSize: 10}) => {
    const {data, error, isLoading, mutate} = useSWR(
        `/admin/getAllUsers?page=${pagination.current}&limit=${
            pagination.pageSize
        }&role=${filter.role || ""}&search=${filter.search || ""}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );
  
    return {
        users: data?.data,
        error,
        isLoading,
        totalPages: data?.totalPages,
        totalItems: data?.totalItems,
        usersMutation: mutate,
    };
};
export default userUsers;
