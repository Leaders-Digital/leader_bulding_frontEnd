import useSWR from "swr";
import {fetcher} from "../Config/SwrConfig";

const useCurrentUser = (disabled = false) => {
    const {data, isLoading, error} = useSWR(
        disabled ? null : "user/getCurrentUser", 
        disabled ? null : fetcher, 
        {
            shouldRetryOnError: false,
            revalidateOnFocus: false,
            refreshInterval: disabled ? 0 : 15 * 60 * 1000,
            revalidateIfStale: !disabled,
            revalidateOnReconnect: !disabled,
        }
    );
    return {
        data: disabled ? null : data,
        error: disabled ? null : error,
        isLoading: disabled ? false : isLoading,
    };
};
export default useCurrentUser;
