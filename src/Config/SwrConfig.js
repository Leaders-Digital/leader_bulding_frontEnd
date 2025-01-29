import Axios from "./Axios";

export const fetcher = (url) => Axios.get(url).then((res) => res.data);
export const PostFetcher = async (url, arg) => {
  try {
    const response = await Axios.post(url, arg);

    return response.data;
  } catch (e) {
  
    throw e.response?.data || e.message;
  }
};
export const PutFetcher = async (url, arg) => {
  try {
    const res = await Axios.put(url, arg);

    return res.data;
  } catch (e) {
   
    throw e.response?.data || e.message;
  }
};
export const swrConfig = {
  fetcher,
  revalidateOnFocus: true,
  shouldRetryOnError: true,
  dedupingInterval: 5000,
};
