import Axios from "./Axios";

export const fetcher = (url) => Axios.get(url).then((res) => res.data);
export const PostFetcher = (url, arg) =>
  Axios.post(url, arg)
    .then((res) => {
      console.log("consoel from the swr config", res.data);
      res.data;
    })
    .catch((error) => {
      console.log("error from fetcher", error);
      throw error.response?.data || error.message;
    });
export const swrConfig = {
  fetcher,
  revalidateOnFocus: true,
  shouldRetryOnError: true,
  dedupingInterval: 5000,
};
