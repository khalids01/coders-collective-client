import { endpoints } from "@/constants";
import api from "../api";

export const me = () => {
  const res = api.get(endpoints.server.user.me);
  return res;
};
