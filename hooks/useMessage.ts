import { RootState } from "@/redux/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  sendMessage as sendMessageService,
  getMessages,
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
import { compact } from "@/utils/compactText";

const useMessage = () => {
  const { socket } = useSockets();
  const dispatch = useDispatch();
  const { messages, chat_name } = useSelector(
    (state: RootState) => state.conversation
  );

  const addANewMessage = (message: Message) => {
    dispatch(addANewMessageAction(message));
  };

  const setConverSationId = (id: string) => {
    dispatch(setConverSationIdAction(id));
  };

  const lastMessage = ({
    senderUsername,
    receiverUsername,
  }: {
    senderUsername: string;
    receiverUsername: string;
  }): string => {
    const filteredMsgs = messages.data.filter((m: Message) => {
      if (
        (m.sender.username === senderUsername &&
          m.receiver.username === receiverUsername) ||
        (m.sender.username === receiverUsername &&
          m.receiver.username === senderUsername)
      ) {
        return m;
      }
    });
    const lastMsg: Message | undefined = filteredMsgs
      ? filteredMsgs[filteredMsgs.length - 1]
      : undefined;

    if (lastMsg) {
      if (lastMsg.message.text) {
        return `${
          lastMsg.sender.username === senderUsername
            ? "You "
            : compact(lastMsg.sender.username, 12, true)
        } : ${compact(lastMsg.message.text, 20, true)}`;
      }

      if (lastMsg.message.images) {
        return `${
          lastMsg.sender.username === senderUsername
            ? "You "
            : compact(lastMsg.sender.username, 12, true)
        } : Image`;
      }
    }

    return "No messages yet.";
  };

  const {
    mutate: sendMessage,
    isLoading: sendMessageLoading,
    isSuccess: sendMessageSuccess,
  } = useMutation(sendMessageService, {
    onSuccess: (data) => {
      dispatch(addANewMessageAction(data.data.data));
      socket.emit(EVENTS.SERVER.SET_CONVERSATION_NEW_MESSAGE, {
        message: data.data.data,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

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

  return {
    messages,
    addANewMessage,
    refetchMessages,
    sendMessage,
    sendMessageLoading,
    sendMessageSuccess,
    setConverSationId,
    chat_name,
    lastMessage,
  };
};

export default useMessage;
