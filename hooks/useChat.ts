import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFriends } from "@/services/chat/friend";
import { setFriends as setFriendsAction, setActiveUsers as setActiveUsersAction } from "@/redux/slices/chatSlice";
import { RootState } from "@/redux/store";
import Friend from "@/types/friend";
import queryKeys from "@/constants/reactQueryKeys";
import { getChatData } from "@/services/chat/chatData";
import { ChatType } from "@/types";
import { SocketUser } from "./useMessage";

interface Params {
  id?: string | undefined;
  type?: ChatType | undefined;
}

const useChat = ({ id = "", type = "user" }: Params = {}) => {
  const dispatch = useDispatch();

  const { friends, activeUsers } = useSelector((state: RootState) => state.chat);

  const setFriends = (friendsArr: Friend[]) => {
    dispatch(setFriendsAction(friendsArr));
  };

  const setActiveUsers = (users: SocketUser[]) => {
    dispatch(setActiveUsersAction(users))
  }

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

  const { data: chatData, refetch: refetchChatData } = useQuery(
    [queryKeys.chat + id],
    () => getChatData({ id, type }),
    {
      enabled: !!id && !!type,
    }
  );

  // const {refetch: refetchUsers} = useQuery([queryKeys.users.all] , ()=>getUsers())


  return {
    refetchFriends,
    setFriends,
    friends,
    chatData: chatData?.data?.data,
    refetchChatData,
    activeUsers,
    setActiveUsers
  };

};

export default useChat;
