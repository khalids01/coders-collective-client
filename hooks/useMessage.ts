import { images } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { sendMessage as sendMessageService } from "@/services/chat/message";
import { User } from "@/types";

const useMessage = () => {
  const [sendingTo, setSendingTo] = useState<User>({
    user_name: "Someone",
    avatar: images.k,
    email: "email@domain.com",
    description: "Hi there, I am using coders collective",
    skills: [],
    _id: 'asdfa',
    active: false,
    bio: 'asdfasdf',
    cover: '',
    exp: 0,
    first_name: 'Khalid',
    last_name: 'Khan',
    iat: 0,
    occupation: 'programmer' 
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
