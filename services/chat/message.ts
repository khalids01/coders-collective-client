import { AxiosResponse } from "axios";
import api from "../api";
import { endpoints } from "@/constants";

export const sendMessage = (data: FormData): Promise<AxiosResponse<any, any>> => {
  return api.post(endpoints.server.message.send_message, data);
};

export const getMessages = ({ receiverId }: { receiverId: string }) => {
  return api.get(`${endpoints.server.message.get_messages}/${receiverId}`);
};
