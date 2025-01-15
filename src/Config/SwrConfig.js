import { revalidateEvents } from "swr/_internal";
import Axios from "./Axios";

export const fetcher = (url) => Axios.get(url).then((res) => res.data);
export const swrConfig = {
  fetcher,
  revalidateOnFocus: true,
  shouldRetryOnError: true,
  dedupingInterval: 5000,
};
