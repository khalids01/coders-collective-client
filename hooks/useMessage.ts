import { RootState } from "@/redux/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  sendMessage as sendMessageService,
  getMessages,
} from "@/services/chat/message";
import { reactQueryKeys } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessages as setMessagesAction,
  setSendMessageData as setSendMessageDataAction,
  setConverSationId as setConverSationIdAction,
} from "@/redux/slices/conversationSlice";
import { Message } from "@/types";
import { SendMessageData } from "@/types/conversation";

const useMessage = () => {
  const dispatch = useDispatch();
  const { messages: liveMessages, sendMessageData, conversationId } = useSelector(
    (state: RootState) => state.conversation
  );

  const setMessages = ({ messages }: { messages: Message[] }) => {
    dispatch(setMessagesAction(messages));
  };

  const setSendMessageData = (data: SendMessageData) => {
    dispatch(setSendMessageDataAction(data));
  };

  const setConverSationId = (id: string) => {
    dispatch(setConverSationIdAction(id));
  };

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
    [reactQueryKeys.messages + conversationId],
    () => getMessages({ receiverId: conversationId as string }),
    {
      enabled: !!conversationId,
    }
  );

  return {
    messages: messages?.data,
    refetchMessages,
    sendMessage,
    sendingMessage,
    sentMessageSuccess,
    liveMessages,
    sendMessageData,
    setLiveMessages: setMessages,
    setSendMessageData,
    setConverSationId,
    conversationId
  };
};

export default useMessage;
