import { retrieveToken } from "@/utils/tokenStore";
import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL,
});

api.defaults.headers.common["Content-Type"] = "application/json";

if(retrieveToken()){
    api.defaults.headers.common["Authorization"] = `Bearer ${retrieveToken()}`
}

export default api;
