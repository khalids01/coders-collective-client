import { EVENTS, SOCKET_URL } from "@/constants/socketConfig";
import { useArray, useTheme, useToken, useUser } from "@/hooks";
import { ActionIcon, Center, Dialog, Group, Modal, Stack, Text } from "@mantine/core";
import { Friend, Message, User } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import type { ArrayStatesType } from "@/hooks/useArray";
import useSound from "use-sound";
import { endpoints, sounds } from "@/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProfileImage } from "@/components/common/sub";
import { compact } from "@/utils/compactText";
import { notifications, showNotification } from "@mantine/notifications";
import { Call, CallOff } from "@/constants/icons";

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

const socket = io(SOCKET_URL as string, {
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
  const [incomingCallInfo, setIncomingCallInfo] = useState<{ from: string, offer: any }>()
  const [openCallDialog, setOpenCallDialog] = useState(false)
  const { colors } = useTheme()
  const [discordSound] = useSound(sounds.discord, {
    id: "discord-sound",
    volume: 0.5,
  });

  const [callRingtone, {stop}] = useSound(sounds.callRingtone, {
    id: 'call-ringtone-round',
    volume: 0.7
  })

  const initialSocketActions = useCallback(() => {
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
    // to show active user
    socket.emit(EVENTS.SERVER.ADD_ACTIVE_USER, user);

    // to handle audio and video call webRTC
    socket.emit(EVENTS.SERVER.JOIN_ROOM, { username: user?.username });

    socket.on(EVENTS.CLIENT.GET_ACTIVE_FRIENDS, (values) => {
      setActiveFriends(values);
    });
  }, []);

  const newMessage = useCallback((data: Message) => {
    discordSound();
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
  }, []);

  const handleIncomingCall = useCallback(({ from, offer, fromAvatar }: any) => {
    console.log("call from : ", from, offer);
    setIncomingCallInfo({ from, offer })
    setOpenCallDialog(true)
    callRingtone()
  }, []);


  useEffect(() => {
    initialSocketActions();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!socket) return;

    socket.on(EVENTS.CLIENT.GET_CONVERSATION_NEW_MESSAGE, newMessage);

    return () => {
      socket.off(EVENTS.CLIENT.GET_CONVERSATION_NEW_MESSAGE, newMessage);
    };
  }, [isLoggedIn, socket, router.query?.chat_name]);

  useEffect(() => {
    if (!socket) return;
    socket.on(EVENTS.CLIENT.INCOMING_CALL, handleIncomingCall);

    return () => {
      socket.off(EVENTS.CLIENT.INCOMING_CALL, handleIncomingCall);
    };
  }, [socket]);

  if (!isLoggedIn || !user?._id) {
    return <>{props.children}</>;
  }

  const acceptcall = () => {
    socket.emit(EVENTS.CLIENT.ACCEPT_CALL, ({ from: user?.username }));
    router.push(endpoints.client.room + '/' + incomingCallInfo?.from)
  }

  const rejectCall = () => {
    socket.emit(EVENTS.CLIENT.REJECT_CALL, ({ from: user?.username, to: incomingCallInfo?.from }))
    stop()
    setOpenCallDialog(false)
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
    >
      <Dialog
        opened={openCallDialog}
        onClose={() => setOpenCallDialog(false)}
        radius={10}
        styles={{
          root: {
            backgroundColor: colors.background.lighter,
            minHeight: 300
          }
        }}
      >
        <Center mt={20}>
          <ProfileImage
            username="Khalid"
            avatar=''
            size={60}
          />
        </Center>

        <Text mt={16} color={colors.text.primary} size={'lg'} align='center'>
          Khalid
        </Text>

        <Group spacing={40} mt={60} position='center'>
          <ActionIcon
            radius={100}
            h={'auto'}
            w='auto'
            p={10}
            color="red"
            variant="filled"
            onClick={rejectCall}
          >
            <CallOff size={26} />
          </ActionIcon>

          <ActionIcon
            radius={100}
            h={'auto'}
            w='auto'
            p={10} color="green"
            variant="filled"
            onClick={acceptcall}
          >
            <Call size={26} />
          </ActionIcon>
        </Group>


      </Dialog>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;
