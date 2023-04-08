import { retrieveToken } from "@/utils/tokenStore";
import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const contentType =
    config.data instanceof FormData
      ? "multipart/form-data"
      : "application/json";
  config.headers["Content-Type"] = contentType;
  if (retrieveToken()) {
    config.headers.Authorization = `Bearer ${retrieveToken()}`;
  }
  return config;
});

export default api;
