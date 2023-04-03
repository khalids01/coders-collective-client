import { useMutation, useQuery } from "@tanstack/react-query";
import {
  sendMessage as sendMessageService,
  getMessages,
} from "@/services/chat/message";
import { reactQueryKeys } from "@/constants";

const useMessage = ({ receiverId }: { receiverId: string }) => {
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
    [reactQueryKeys.messages],
    () => getMessages({ receiverId }),
    {
      enabled: !!receiverId,
    }
  );

  return {
    messages: messages?.data,
    refetchMessages,
    sendMessage,
    sendingMessage,
    sentMessageSuccess,
  };
};

export default useMessage;
