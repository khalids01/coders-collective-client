import { EVENTS, SOCKET_URL } from "@/constants/socketConfig";
import { useArray, useToken, useUser } from "@/hooks";
import { Text } from "@mantine/core";
import { Friend, Message, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import type { ArrayStatesType } from "@/hooks/useArray";
import useSound from "use-sound";
import { endpoints, sounds } from "@/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProfileImage } from "@/components/common/sub";
import { compact } from "@/utils/compactText";
import { showNotification } from "@mantine/notifications";

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
  newMessagesArray: ArrayStatesType | {};
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
  newMessagesArray: {},
});

const SocketsProvider = (props: any) => {
  const { isLoggedIn } = useToken();
  const { user } = useUser();
  const [username, setUserName] = useState();
  const [chat_name, setChat_name] = useState();
  const [activeFriends, setActiveFriends] = useState<SocketUser[]>([]);
  const newMessagesArray = useArray([]);
  const router = useRouter();
  const [discordSound] = useSound(sounds.discord, {
    volume: 0.5,
  });
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

  useEffect(() => {
    if (!socket) return;

    socket.on(EVENTS.CLIENT.GET_CONVERSATION_NEW_MESSAGE, (data: Message) => {
      discordSound();

      if (!isLoggedIn) return;
      if (router.query?.chat_name === data.sender.username) return;

      showNotification({
        id: data.sender.username,
        title: (
          <Text
            href={`${endpoints.client.chat}/${data.sender.username}`}
            component={Link}
          >
            {data.sender.username}
          </Text>
        ),
        message: (
          <Text
            href={`${endpoints.client.chat}/${data.sender.username}`}
            component={Link}
          >
            {data.message.text
              ? compact(data.message.text, 20, true)
              : data.message.images && "Image"}
          </Text>
        ),
        icon: (
          <ProfileImage
            size={35}
            username={data.sender.username}
            avatar={data.sender.avatar}
          />
        ),
        styles: {
          title: {
            cursor: "pointer",
            a: {
              display: "block",
            },
          },
          description: {
            cursor: "pointer",
            a: {
              display: "block",
            },
          },
        },
      });
    });
  }, [isLoggedIn, socket, router.query?.chat_name]);

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
