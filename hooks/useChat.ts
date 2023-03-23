import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFriends } from "@/services/chat/friend";
import { setFriends as setFriendsAction, setActiveChat } from "@/redux/slices/chatSlice";
import { RootState } from "@/redux/store";
import Friend from "@/types/friend";
import queryKeys from "@/constants/reactQueryKeys";

const useChat = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state: RootState) => state.chat);

  const setFriends = (friendsArr: Friend[]) => {
    dispatch(setFriendsAction(friendsArr));
  };

  const { data } = useQuery([queryKeys.friends], () => getFriends(), {
    onSuccess(data) {
      // console.log(data.data?.data)
      const friendsArr = data.data?.data?.friends
      dispatch(setFriendsAction(friendsArr));
      dispatch(setActiveChat(friendsArr[0]))
    },
  });



  return {
    setFriends,
    friends,
  };
};

export default useChat;
