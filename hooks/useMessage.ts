import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  sendMessage as sendMessageService,
  getMessages,
} from "@/services/chat/message";
import { reactQueryKeys } from "@/constants";
import { io, Socket } from "socket.io-client";
import useUser from "./useUser";
import { endpoints } from "@/constants";
import { User } from "@/types";
import useChat from "./useChat";

export interface SocketUser {
  userId: string;
  socketId: string;
  userInfo: User;
}

const useMessage = ({ receiverId }: { receiverId: string }) => {
  const { setActiveUsers } = useChat();
  const { user } = useUser();
  const socket = useRef<Socket>();
  const {
    mutate: sendMessage,
    isLoading: sendingMessage,
    isSuccess: sentMessageSuccess,
  } = useMutation(sendMessageService, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: messages, refetch: refetchMessages } = useQuery(
    [reactQueryKeys.messages + receiverId],
    () => getMessages({ receiverId }),
    {
      enabled: !!receiverId,
    }
  );

  useEffect(() => {
    if (!user?._id) return;

    socket.current = io(process.env.NEXT_PUBLIC_WS || "http://localhost:3005");

    socket.current.on("connect", () => {});
    console.log("Socket Active", socket.current.active);
    // socket.on("disconnect", () => {
    //   console.log("Socket Disconnected from server");
    // });

    socket.current?.emit(endpoints.server.socketIo.addUser, user?._id, user);

    socket.current?.on(
      endpoints.server.socketIo.getUser,
      (users: SocketUser[]) => {
        setActiveUsers(users);
      }
    );

    return () => {
      socket.current?.disconnect();
    };
  }, [user?._id]);

  return {
    messages: messages?.data,
    refetchMessages,
    sendMessage,
    sendingMessage,
    sentMessageSuccess,
  };
};

export default useMessage;
