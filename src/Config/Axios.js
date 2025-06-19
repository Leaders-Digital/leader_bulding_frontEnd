import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const Axios = axios.create({
    baseURL: "https://serveur.leaders-building.com/api",
    withCredentials: true,
    headers: {"  Content-Type": "application/json", "x-api-key": apiKey},
});

export default Axios;
