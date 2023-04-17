import { EVENTS, SOCKET_URL } from "@/constants/socketConfig";
import { useToken, useUser } from "@/hooks";
import { Friend, Message, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addANewMessage } from "@/redux/slices/conversationSlice";

interface SocketUser {
  socketId: string;
  user: User;
}

interface Context {
  socket: Socket;
  username?: string;
  setUserName: Function;
  roomId?: string;
  newMessages?: Message;
  setNewMessages?: Function;
  newFriend?: Friend;
  setNewFriend?: Function;
  activeFriends: SocketUser[];
}

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

const SocketContext = createContext<Context>({
  socket,
  setUserName: () => false,
  activeFriends: [],
});

const SocketsProvider = (props: any) => {
  const { isLoggedIn } = useToken();
  const { user } = useUser();
  const [username, setUserName] = useState();
  const [roomId, setRoomId] = useState();
  const [activeFriends, setActiveFriends] = useState<SocketUser[]>([]);
  const dispatch = useDispatch();
  function handleSocket() {
    console.log('running')
    if (!isLoggedIn) {
      if (socket.connected) {
        socket.close();
      }
      return;
    }

    if (!user?._id) {
      return;
    }

    socket.connect();

    socket.emit(EVENTS.SERVER.ADD_ACTIVE_USER, user);

    socket.on(EVENTS.CLIENT.GET_ACTIVE_FRIENDS, (values) => {
      setActiveFriends(values);
    });
    socket.off(EVENTS.SERVER.GET_CONVERSATION_NEW_MESSAGE);
    socket.on(EVENTS.SERVER.GET_CONVERSATION_NEW_MESSAGE, (data) => {
      dispatch(addANewMessage(data));
    });
    return
  }

  useEffect(() => {
    handleSocket();
  }, [isLoggedIn]);

  if (!isLoggedIn || !user?._id) {
    return <>{props.children}</>;
  }

  return (
    <SocketContext.Provider
      value={{ socket, username, setUserName, roomId, activeFriends }}
      {...props}
    />
  );
};

export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;
