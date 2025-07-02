import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://serveur.leaders-building.com/api",
    withCredentials: true, // Always enable credentials for authentication
    headers: {"  Content-Type": "application/json", "x-api-key": apiKey},
});

export default Axios;
