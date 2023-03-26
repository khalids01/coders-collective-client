import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFriends } from "@/services/chat/friend";
import { setFriends as setFriendsAction, setActiveChat } from "@/redux/slices/chatSlice";
import { RootState } from "@/redux/store";
import Friend from "@/types/friend";
import queryKeys from "@/constants/reactQueryKeys";
import { sendMessage as sendMessageService } from "@/services/chat/message";

const useChat = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state: RootState) => state.chat);

  const setFriends = (friendsArr: Friend[]) => {
    dispatch(setFriendsAction(friendsArr));
  };

  const {refetch: refetchFriends} = useQuery([queryKeys.friends], () => getFriends(), {
    onSuccess(data) {
      const friendsArr = data.data?.data?.friends
      dispatch(setFriendsAction(friendsArr));
      dispatch(setActiveChat(friendsArr[0]))
    },
  });

  const {mutate: sendMessage, isLoading: sendingMessage} = useMutation(sendMessageService, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return {
    refetchFriends,
    setFriends,
    friends,
    sendMessage,
    sendingMessage,
  };
};

export default useChat;
