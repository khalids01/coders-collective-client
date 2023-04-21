import { AxiosResponse } from "axios";
import api from "../api";
import { endpoints } from "@/constants";

export const sendMessage = (data: FormData): Promise<AxiosResponse<any, any>> => {
  return api.post(endpoints.server.message.send_message, data);
};

export const getMessages = ({ chat_name }: { chat_name: string }) => {
  return api.get(`${endpoints.server.message.get_messages}/${chat_name}`);
};
