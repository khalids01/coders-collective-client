import { endpoints } from "@/constants";
import api from "../api";

export const getFriends = () => {
  const res = api.get(endpoints.server.chat.friends);
  return res;
};

