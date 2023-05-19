import {
  Group,
  ActionIcon,
  Text,
  Stack,
  Burger,
  Drawer,
  Badge,
} from "@mantine/core";
import dayjs from "dayjs";
import { Call, Video, Info, Left } from "@/constants/icons";
import { useBreakPoints, useTheme, useChat, useUser } from "@/hooks";
import { showChatInfo } from "@/redux/slices/chatLayoutProps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileImage } from "../common/sub";
import { showMainNavDrawer } from "@/redux/slices/chatLayoutProps";
import { Info as ChatInfo } from "@/components/chat";
import { MobileNavbarDrawer } from "@/components/mainLayout/nav";
import { endpoints } from "@/constants";
import { useSockets } from "@/context/socket.context";
import Link from "next/link";
import { useCallback } from "react";
import { EVENTS } from "@/constants/socketConfig";
import { useRouter } from "next/router";
import PeerService from "@/services/chat/peer";

const ChatHeader = ({ chat_name }: { chat_name: string }) => {
  const { colors, colorScheme } = useTheme();
  const { activeFriends } = useSockets();
  const { md, xs } = useBreakPoints();
  const dispatch = useDispatch();
  const { chatData } = useChat({ chat_name, type: "user" });
  const { socket } = useSockets();
  const { user } = useUser();
  const router = useRouter();
  const { showInfo } = useSelector(
    (state: RootState) => state.chatLayout.chatInfo
  );

  const { show: showDrawer } = useSelector(
    (state: RootState) => state.chatLayout.mainNavDrawer
  );

  const active = !!activeFriends.find(
    (f) => f.user.username === chatData?.data?.username
  );

  const startCall = useCallback(async () => {
    const peer = new PeerService();
    const offer = await peer.getOffer();

    socket.emit(EVENTS.CLIENT.CALL, { fromAvatar: user?.avatar, toUsername: router.query?.chat_name, offer, room: user?.username });
    router.push(endpoints.client.room + "/" + router.query?.chat_name + `?room-name=${user?.username}`);
  }, []);

  return (
    <Group
      position="apart"
      py={10}
      px={10}
      mih={70}
      sx={{
        backgroundColor: colors.background.default,
      }}
    >
      <Group
        position="left"
        spacing={xs ? 5 : md ? 10 : 20}
        sx={{ width: "max-content" }}
      >
        {md ? (
          <ActionIcon size={"sm"} component={Link} href={endpoints.client.chat}>
            <Left />
          </ActionIcon>
        ) : null}
        <ProfileImage
          size={xs ? 30 : md ? 35 : 40}
          avatar={chatData?.data?.avatar}
          username={chatData?.data?.username}
        />
        <Stack spacing={0}>
          <Text color={colors.text.primary} size={md ? 16 : 18} weight={500}>
            {chatData?.type === "user"
              ? `${chatData?.data?.first_name} ${chatData?.data?.last_name}`
              : ""}
          </Text>
          <Text color={colors.text.secondary} size={md ? 11 : 14} weight={400}>
            {active ? (
              <Group spacing={5}>
                <Badge h={10} p={0} w={10} bg={"green"} />
                Online
              </Group>
            ) : (
              dayjs().format("MMM D h:mm")
            )}
          </Text>
        </Stack>
      </Group>

      <Group
        spacing={xs ? 5 : md ? 8 : 20}
        position="right"
        align={"center"}
        sx={{
          width: "max-content",
          button: {
            transition: "all 0.3s",
            "&:hover": {
              color: colorScheme === "dark" ? colors.teal : colors.blue,
            },
          },
        }}
      >
        <ActionIcon
          onClick={() => startCall()}
          variant="transparent"
          radius={50}
          h={40}
          w={40}
        >
          <Call size={xs ? 18 : md ? 20 : 24} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="transparent" radius={50} h={40} w={40}>
          <Video size={xs ? 18 : md ? 20 : 24} stroke={1.5} />
        </ActionIcon>
        <>
          <ActionIcon
            onClick={() => dispatch(showChatInfo(!showInfo))}
            variant="transparent"
            radius={50}
            h={40}
            w={40}
          >
            <Info size={xs ? 18 : md ? 20 : 24} stroke={1.5} />
          </ActionIcon>
          <Drawer
            position="right"
            withCloseButton={false}
            size={340}
            opened={showInfo}
            onClose={() => dispatch(showChatInfo(false))}
          >
            {chatData?.type === "user" ? (
              <ChatInfo type={"user"} user={chatData.data} />
            ) : null}
          </Drawer>
        </>
        {md && (
          <>
            <Burger
              opened={showDrawer}
              onClick={() => dispatch(showMainNavDrawer(!showDrawer))}
              size="sm"
              color={colors.text.secondary}
            />
            <MobileNavbarDrawer />
          </>
        )}
      </Group>
    </Group>
  );
};

export default ChatHeader;
