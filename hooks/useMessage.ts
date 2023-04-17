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
  addMessages as addMessagesAction
} from "@/redux/slices/conversationSlice";
import { Message } from "@/types";
import { useSockets } from "@/context/socket.context";
import { EVENTS } from "@/constants/socketConfig";


const useMessage = () => {
  const {socket} = useSockets()
  const dispatch = useDispatch();
  const { messages, roomId } = useSelector(
    (state: RootState) => state.conversation
  );

  const addANewMessage = (message: Message) => {
    dispatch(addANewMessageAction(message));
  };

  const setConverSationId = (id: string) => {
    dispatch(setConverSationIdAction(id));
  };

  const {
    mutate: sendMessage,
    isLoading: sendMessageLoading,
    isSuccess: sendMessageSuccess,
  } = useMutation(sendMessageService, {
    onSuccess: (data) => {
      dispatch(addANewMessageAction(data.data.data));
      socket.emit(EVENTS.SERVER.GET_CONVERSATION_NEW_MESSAGE, {message: data.data.data})
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { refetch: refetchMessages } = useQuery(
    [reactQueryKeys.messages + roomId],
    () => getMessages({ receiverId: roomId as string }),
    {
      enabled: !!roomId,
      onSuccess({data}){
        dispatch(addMessagesAction(data.data))
      }
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
    roomId
  };
};

export default useMessage;
