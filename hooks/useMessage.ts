import { RootState } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  sendMessage as sendMessageService,
  getMessages,
  seenMessage as seenMessageService,
} from "@/services/chat/message";
import { reactQueryKeys } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addANewMessage as addANewMessageAction,
  setConverSationId as setConverSationIdAction,
  addMessages as addMessagesAction,
} from "@/redux/slices/conversationSlice";
import { Message } from "@/types";
import { useSockets } from "@/context/socket.context";
import { EVENTS } from "@/constants/socketConfig";

const useMessage = () => {
  const { socket } = useSockets();
  const dispatch = useDispatch();
  const { messages, chat_name } = useSelector(
    (state: RootState) => state.conversation
  );
  const queryClient = useQueryClient();

  const addANewMessage = (message: Message) => {
    dispatch(addANewMessageAction(message));
  };

  const setConverSationId = (id: string) => {
    dispatch(setConverSationIdAction(id));
  };

  // send message
  const {
    mutate: sendMessage,
    isLoading: sendMessageLoading,
    isSuccess: sendMessageSuccess,
  } = useMutation(sendMessageService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.lastMessage + chat_name],
        exact: true,
      });

      dispatch(addANewMessageAction(data.data.data));

      socket.emit(EVENTS.SERVER.SET_CONVERSATION_NEW_MESSAGE, {
        message: data.data.data,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // get messages
  const { refetch: refetchMessages } = useQuery(
    [reactQueryKeys.messages + chat_name],
    () => getMessages({ chat_name: chat_name as string }),
    {
      enabled: !!chat_name,
      onSuccess({ data }) {
        dispatch(addMessagesAction(data.data));
      },
    }
  );

  // message seen
  const {
    data: messageAfterSeenData,
    isSuccess: messageSeenSuccess,
    mutate: messageSeenMutation,
  } = useMutation(seenMessageService);

  return {
    messages,
    addANewMessage,
    refetchMessages,
    sendMessage,
    sendMessageLoading,
    sendMessageSuccess,
    setConverSationId,
    chat_name,
    messageSeenMutation,
    messageAfterSeenData: messageAfterSeenData?.data,
    messageSeenSuccess,
  };
};

export default useMessage;
