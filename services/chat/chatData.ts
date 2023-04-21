import { endpoints } from "@/constants";
import api from "../api";
import type { ChatType } from "@/types";

export const getChatData = ({chat_name, type} : {chat_name:string, type: ChatType}) => {
  const res = api.get(endpoints.server.chat.chat_data + `?chat_name=${chat_name}&type=${type}`);
  return res;
};
