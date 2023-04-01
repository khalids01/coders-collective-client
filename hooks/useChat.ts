import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFriends } from "@/services/chat/friend";
import { setFriends as setFriendsAction } from "@/redux/slices/chatSlice";
import { RootState } from "@/redux/store";
import Friend from "@/types/friend";
import queryKeys from "@/constants/reactQueryKeys";
import { sendMessage as sendMessageService } from "@/services/chat/message";
import { getChatData } from "@/services/chat/chatData";
import { ChatType } from "@/types";

interface Params {
  id?: string | undefined;
  type?: ChatType | undefined;
}

const useChat = ({ id = '', type = 'user' }: Params = {}) => {
  const dispatch = useDispatch();

  const { friends } = useSelector((state: RootState) => state.chat);

  const setFriends = (friendsArr: Friend[]) => {
    dispatch(setFriendsAction(friendsArr));
  };

  const { refetch: refetchFriends } = useQuery(
    [queryKeys.friends],
    () => getFriends(),
    {
      onSuccess(data) {
        const friendsArr = data.data?.data?.friends;
        dispatch(setFriendsAction(friendsArr));
      },
    }
  );

 

  let chatDataQuery;

  if (id?.length > 0) {
    chatDataQuery = useQuery(
      [queryKeys.chat + id],
      () => getChatData({ id, type }),
      {
        enabled: id?.length > 0 && type?.length > 0,
      }
    );
  }

  // const {refetch: refetchUsers} = useQuery([queryKeys.users.all] , ()=>getUsers())

  return {
    refetchFriends,
    setFriends,
    friends,
    chatData: chatDataQuery?.data?.data,
    refetchChatData: chatDataQuery?.refetch,
  };
};

export default useChat;
