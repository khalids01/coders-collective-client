import { AxiosResponse } from "axios";
import api from "../api";
import { endpoints } from "@/constants";

export const sendMessage = ({
  senderName,
  receiverId,
  message,
}: {
  senderName: string;
  receiverId: string;
  message: string;
}): Promise<AxiosResponse<any, any>> => {
  return api.post(endpoints.server.chat.send_message, {
    senderName,
    receiverId,
    message,
  });
};
