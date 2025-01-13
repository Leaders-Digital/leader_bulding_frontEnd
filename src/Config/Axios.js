import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const Axios = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: { "  Content-Type": "application/json", "x-api-key": apiKey },
});

export default Axios;
