import useSWR from "swr";
import {fetcher} from "../Config/SwrConfig";

const useCurrentUser = () => {
    const {data, isLoading, error} = useSWR("user/getCurrentUser", fetcher, {
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        refreshInterval: 15 * 60 * 1000,
    });
    return {
        data,
        error,
        isLoading,
    };
};
export default useCurrentUser;
