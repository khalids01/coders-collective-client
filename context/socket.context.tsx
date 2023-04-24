import { EVENTS, SOCKET_URL } from "@/constants/socketConfig";
import { useArray, useToken, useUser } from "@/hooks";
import { Friend, Message, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import type {ArrayStatesType} from '@/hooks/useArray'

interface SocketUser {
  socketId: string;
  user: User;
}

interface Context {
  socket: Socket;
  username?: string;
  setUserName: Function;
  chat_name?: string;
  setChat_name: Function;
  newFriend?: Friend;
  newMessagesArray: ArrayStatesType | {},
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
  setChat_name: () => false,
  newMessagesArray: {}
});

const SocketsProvider = (props: any) => {
  const { isLoggedIn } = useToken();
  const { user } = useUser();
  const [username, setUserName] = useState();
  const [chat_name, setChat_name] = useState();
  const [activeFriends, setActiveFriends] = useState<SocketUser[]>([]);
  const newMessagesArray = useArray([]);

  function handleSocket() {
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
  }

  useEffect(() => {
    handleSocket();
  }, [isLoggedIn]);

  if (!isLoggedIn || !user?._id) {
    return <>{props.children}</>;
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUserName,
        newMessagesArray,
        chat_name,
        setChat_name,
        activeFriends,
      }}
      {...props}
    />
  );
};

export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;
