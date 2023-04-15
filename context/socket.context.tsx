import { EVENTS, SOCKET_URL } from "@/constants/socketConfig";
import { Friend, Message } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Context {
  socket: Socket;
  username?: string;
  setUserName: Function;
  roomId?: string;
  newMessages?: Message;
  setNewMessages?: Function;
  newFriend?: Friend;
  setNewFriend?: Function;
  activeFriends: Friend[];
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUserName: () => false,
  activeFriends: [],
});

const SocketsProvider = (props: any) => {
  const [username, setUserName] = useState();
  const [roomId, setRoomId] = useState();
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [newFriend, setNewFriend] = useState<Friend>();
  const [activeFriends, setActiveFriends] = useState<Friend[]>([]);

  socket.on(EVENTS.SERVER.ACTIVE_FRIENDS, (values) => {
    setActiveFriends(values);
  });

  return <SocketContext.Provider value={{ socket, username, setUserName, roomId }} {...props} />;
};

export const useSockets = () => useContext(SocketContext)
export default SocketsProvider
