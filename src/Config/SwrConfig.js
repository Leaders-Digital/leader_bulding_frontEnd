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

export const fetchBody = async (body) => {
  const options = {
    method: "POST",
    url: body[0],
    data: body[1],
  };
  try {
    const res = await Axios(options);
    // console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const swrConfig = {
  fetcher,
  revalidateOnFocus: true,
  shouldRetryOnError: true,
  dedupingInterval: 5000,
};
