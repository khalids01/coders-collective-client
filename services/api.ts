import { retrieveToken } from "@/utils/tokenStore";
import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL,
});


api.interceptors.request.use((config) => {
  config.headers["Content-Type"] =  "application/json"
  if (retrieveToken()) {
    config.headers.Authorization = `Bearer ${retrieveToken()}`;
  }
  return config;
});

export default api;
