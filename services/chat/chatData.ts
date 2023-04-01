import { endpoints } from "@/constants";
import api from "../api";
import type { ChatType } from "@/types";

export const getChatData = ({id, type} : {id:string, type: ChatType}) => {
  const res = api.get(endpoints.server.chat.chat_data + `?id=${id}&type=${type}`);
  return res;
};
