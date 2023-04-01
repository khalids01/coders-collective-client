import { images } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { sendMessage as sendMessageService } from "@/services/chat/message";

const useMessage = () => {
  const [sendingTo, setSendingTo] = useState({
    name: "Someone",
    avatar: images.k,
    mobile: "+8801749406592",
    about: "Hi there, I am using coders collective",
    starredMessages: [],
    muteNotification: false,
    commonConnections: ["asdfkasdflkj"],
  });

  const { mutate: sendMessage, isLoading: sendingMessage } = useMutation(
    sendMessageService,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return {
    sendingTo,
    sendMessage,
    sendingMessage,
  };
};

export default useMessage;
