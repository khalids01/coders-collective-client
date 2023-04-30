import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  Group,
  Stack,
  UnstyledButton,
  ActionIcon,
  Box,
  Burger,
  Divider,
  ScrollArea,
  Badge,
  useMantineTheme,
  Center,
  SegmentedControl,
  createStyles,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useBreakPoints, useTheme, useUser, useChat } from "@/hooks";
import { Plus } from "@/constants/icons";
import { CircleDashed, Search, Filter, CheckIcon } from "@/constants/icons";
import { CompactText, ProfileImage } from "@/components/common/sub";
import { Div } from "@/components/common/sub";
import Friend from "@/types/friend";
import { useRouter } from "next/router";
import { endpoints, sounds } from "@/constants";
import { Message, User } from "@/types";
import { showMainNavDrawer } from "@/redux/slices/chatLayoutProps";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { MobileNavbarDrawer } from "@/components/mainLayout/nav";
import { useSockets } from "@/context/socket.context";
import { ArrayStatesType } from "@/hooks/useArray";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "@/services/chat/message";
import { reactQueryKeys } from "@/constants";
import { compact } from "@/utils/compactText";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { EVENTS } from "@/constants/socketConfig";

dayjs.extend(relativeTime);
dayjs.extend(utc);

const DATA = [
  { label: "Friends", value: "friends" },
  { label: "Explore", value: "explore" },
];

const useStyle = createStyles((_, colors: any) => ({
  chatItem: {
    padding: "16px 25px 16px 16px",
    display: "grid",
    gridTemplateColumns: "60px auto",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: `0 0 12px ${colors.shadows.default}`,
    borderRadius: 8,
    // border: `1px solid ${active ? colors.teal : "transparent"}`,
    transition: "all 0.3s",
    "&:hover": {
      scale: "101%",
      boxShadow: `0 0 20px ${colors.shadows.default}`,
    },
  },

  addBtn: {
    color: colors.card.focus,
    transition: "all 0.3s",
    display: "grid",
    placeItems: "center",
    "&:hover": {
      scale: "102%",
    },
  },
}));

const SingleActiveUser = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <UnstyledButton
      onClick={() => router.push(`${endpoints.client.chat}/${user.username}`)}
      pos="relative"
    >
      <Badge
        h={12}
        w={12}
        bg={"mediumturquoise"}
        pos={"absolute"}
        right={0}
        top={0}
        p={0}
        sx={{
          zIndex: 2,
        }}
      />
      <ProfileImage size={40} avatar={user.avatar} username={user.username} />
    </UnstyledButton>
  );
};

const ActiveUsers = () => {
  const { activeFriends } = useSockets();
  const { colors } = useTheme();
  const { user } = useUser();

  if (activeFriends.length < 2) return <></>;

  return (
    <ScrollArea
      maw={300}
      ml={10}
      type="auto"
      offsetScrollbars
      mb={-10}
      styles={{
        viewport: {
          marginBottom: 10,
        },
      }}
    >
      <Text size={22} weight={600} color={colors.text.primary} mb={10}>
        Active
      </Text>
      <Group noWrap>
        {activeFriends
          ? activeFriends?.map((item, index) => {
              if (user?._id === item.user._id)
                return <React.Fragment key={index} />;
              return <SingleActiveUser key={index} user={item.user} />;
            })
          : null}
      </Group>
    </ScrollArea>
  );
};

const ChatItem = ({ friend }: { friend: Friend }) => {
  const { colors } = useTheme();
  const { md } = useBreakPoints();
  const router = useRouter();
  const { chat_name } = router.query;
  const { classes } = useStyle(colors);
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);
  const [active, setActive] = useState(chat_name === friend.username);
  const [lastMessage, setLastMessage] = useState("No message yet");
  const { user } = useUser();
  const { invalidateQueries } = useQueryClient();
  const { socket } = useSockets();
  const [lastMsgDate, setLastMsgDate] = useState(dayjs());

  const { newMessagesArray } = useSockets();
  const { array } = newMessagesArray as ArrayStatesType;

  const handleChatItemClick = () => {
    router.push(`${endpoints.client.chat}/${friend.username}`);
  };

  useQuery(
    [reactQueryKeys.lastMessage + friend.username],
    () => getMessages({ chat_name: friend.username as string, limit: 1 }),
    {
      onSuccess: (data) => {
        const lastMsg: Message | undefined = data?.data?.data[0];
        let text: string = "No message yet";
        if (lastMsg) {
          setLastMsgDate(dayjs(lastMsg.updatedAt).utc());
          if (lastMsg.message.text) {
            text = `${
              lastMsg.sender.username === user?.username
                ? "You "
                : compact(lastMsg.sender.username, 12, true)
            } : ${compact(lastMsg.message.text, 20, true)}`;
          } else if (lastMsg.message.images) {
            text = `${
              lastMsg.sender.username === user?.username
                ? "You "
                : compact(lastMsg.sender.username, 12, true)
            } : Image`;
          }
        }

        setLastMessage(text);
      },
    }
  );


  useEffect(() => {
    if (!chat_name || !array) return;
    setActive(chat_name === friend.username);
    const newMsg: Message | undefined = array?.find(
      (newMsg: Message) => newMsg.sender.username !== chat_name
    );
    if (active) {
      setHasNewMessage(false);
      return;
    }

    setHasNewMessage(!!newMsg?.sender?.username);
  }, [chat_name, array]);

  useEffect(() => {
    if (!socket) return;

    socket.on(EVENTS.CLIENT.GET_CONVERSATION_NEW_MESSAGE, (data: Message) => {
      console.log(data?.sender?.username);
    });

    const interval = setInterval(() => {
      setLastMsgDate(dayjs());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = lastMsgDate.fromNow();

  return (
    <UnstyledButton
      mx={4}
      onClick={handleChatItemClick}
      className={classes.chatItem}
      pos="relative"
      sx={{
        backgroundColor: active ? colors.card.focus : colors.background.paper,
      }}
    >
      {!active && hasNewMessage && (
        <Box
          pos="absolute"
          left={5}
          top={5}
          bg={colors.card.focus}
          h={15}
          w={15}
          sx={{
            borderRadius: 50,
            zIndex: 1,
            filter: `drop-shadow(0 0 10px ${colors.card.focus})`,
          }}
        />
      )}

      <ProfileImage
        username={friend.username}
        avatar={friend.avatar}
        size={40}
      />
      <Stack align={"stretch"} spacing={4}>
        <Group position="apart">
          <Text weight={600}>
            <CompactText
              color={active ? "white" : undefined}
              text={`${friend.first_name} ${friend.last_name}`}
              length={md ? 20 : 30}
            />
          </Text>
          {lastMessage !== "No message yet" && lastMsgDate ? (
            <Text size={13} pt={3}>
              {timeAgo}
            </Text>
          ) : null}
        </Group>
        <Group position="apart">
          <Text size={14}>{lastMessage}</Text>
          {/* <Badge
              py={5}
              px={6}
              bg={active ? "var(--badgeBg)" : colors.background.default}
              sx={{
                color: active ? "black" : "var(--blue)",
              }}
            >
              {howManyUnreadMessages}
            </Badge> */}
        </Group>
      </Stack>
    </UnstyledButton>
  );
};

const AddConnection = ({ connection }: { connection: User }) => {
  const { colors } = useTheme();
  const { md } = useBreakPoints();
  const router = useRouter();
  const { id } = router.query;
  const { classes } = useStyle(colors);
  const [requestSent, setRequestSent] = useState(false);
  const handleChatItemClick = () => {
    router.push(`${endpoints.client.chat}/${connection.username}`);
  };

  return (
    <Box
      mx={4}
      className={classes.chatItem}
      sx={{
        backgroundColor: colors.background.paper,
      }}
    >
      <ProfileImage username={connection.username} avatar={connection.avatar} />
      <Group position="apart">
        <Stack spacing={0}>
          <Text weight={600}>
            <CompactText
              color={id === connection._id ? "white" : undefined}
              text={`${connection.first_name} ${connection.last_name}`}
              length={md ? 20 : 30}
            />
          </Text>
          <Text size={14}>
            <CompactText text={"Last message"} length={md ? 20 : 30} />
          </Text>
        </Stack>
        <Group position="right">
          {requestSent ? (
            <UnstyledButton
              className={classes.addBtn}
              onClick={() => setRequestSent(!requestSent)}
              h={30}
              w={30}
              p={0}
              color={colors.card.focus}
            >
              <CheckIcon size={25} stroke={3} color="mediumaquamarine" />
            </UnstyledButton>
          ) : (
            <UnstyledButton
              className={classes.addBtn}
              onClick={() => setRequestSent(!requestSent)}
              h={30}
              w={30}
              p={0}
              color={colors.card.focus}
            >
              <Plus size={25} />
            </UnstyledButton>
          )}
        </Group>
      </Group>
    </Box>
  );
};

const Chats = () => {
  const mantineTheme = useMantineTheme();
  const { md } = useBreakPoints();
  const { colors } = useTheme();
  const { user } = useUser();
  const { ref, height } = useElementSize();
  const [scrollHeight, setScrollHeight] = useState(200);
  const { ref: first, height: firstHeight } = useElementSize();
  const { friends } = useChat();
  const [chatSectionData, setChatSectionData] = useState(DATA[0].value);
  const dispatch = useDispatch();
  const { show } = useSelector(
    (state: RootState) => state.chatLayout.mainNavDrawer
  );

  useEffect(() => {
    if (!height || !firstHeight) return;
    setScrollHeight(height - firstHeight);
  }, [firstHeight]);

  return (
    <Stack
      ref={ref}
      spacing={0}
      align="stretch"
      className="relative h-full shadow-md"
      sx={{
        borderRight: `1px solid ${colors.divider}`,
        width: "100%",
        height: "100svh",
        overflow: "hidden",
        maxWidth: md ? "auto" : 400,
        backgroundColor: colors.background.default,
      }}
    >
      <Box ref={first} pt={md ? 10 : 16} px={16}>
        <Group position="apart" align={"center"}>
          <Text weight={700} size={26} color={colors.text.primary}>
            Chats
          </Text>
          <Group>
            <UnstyledButton pt={8}>
              {user?.active ? (
                <Div
                  mb={10}
                  h={15}
                  w={15}
                  rounded={30}
                  bg={mantineTheme.colors.green[5]}
                />
              ) : (
                <CircleDashed size={24} />
              )}
            </UnstyledButton>
            {md && (
              <>
                <Burger
                  opened={show}
                  onClick={() => dispatch(showMainNavDrawer(!show))}
                />
                <MobileNavbarDrawer />
              </>
            )}
          </Group>
        </Group>

        <Box my={20}>
          <TextInput
            placeholder="Search"
            icon={<Search size={22} />}
            iconWidth={50}
            rightSection={
              <ActionIcon>
                <Filter size={22} />
              </ActionIcon>
            }
            radius={20}
            styles={{
              input: {
                background: colors.background.default,
                height: 45,
                paddingLeft: 30,
              },
              rightSection: {
                width: 60,
              },
              icon: {
                width: 60,
                display: "grid",
                placeItems: "center",
              },
            }}
          />
        </Box>

        <Divider color={colors.divider} mt={16} />
      </Box>
      <SegmentedControl
        color={colors.background.paper}
        value={chatSectionData}
        onChange={setChatSectionData}
        my={16}
        mx={20}
        fullWidth
        size="md"
        data={DATA}
        styles={{
          root: {
            backgroundColor: colors.background.paper,
          },
          indicator: {
            backgroundColor: colors.card.focus,
          },
        }}
      />
      <ScrollArea.Autosize
        mah={md ? scrollHeight : scrollHeight - 20}
        offsetScrollbars
        pl={16}
        pr={4}
      >
        <Stack spacing={18}>
          <ActiveUsers />
          {(() => {
            if (chatSectionData === "explore") {
              return (
                <>
                  {friends ? (
                    Object.values(friends)?.map((connection, index) => (
                      <AddConnection key={index} connection={connection} />
                    ))
                  ) : (
                    <Center py={40}>
                      <Text>Nothing to show</Text>
                    </Center>
                  )}
                </>
              );
            }

            if (chatSectionData === "connections") {
              return (
                <>
                  {friends ? (
                    Object.values(friends)?.map((friend, index) => (
                      <>
                        <ChatItem key={index} friend={friend} />
                      </>
                    ))
                  ) : (
                    <Center py={40}>
                      <Text>Nothing to show</Text>
                    </Center>
                  )}
                </>
              );
            }

            if (chatSectionData === "friends") {
              return (
                <>
                  {friends ? (
                    Object.values(friends)?.map((friend, index) => (
                      <ChatItem key={index} friend={friend} />
                    ))
                  ) : (
                    <Center py={40}>
                      <Text>Nothing to show</Text>
                    </Center>
                  )}
                </>
              );
            }
          })()}

          <Divider
            mb="xs"
            label={<Text color={colors.text.secondary}>End</Text>}
            labelPosition="center"
            sx={{
              "&::after, &::before": {
                borderColor: colors.text.secondary,
              },
            }}
          />
        </Stack>
      </ScrollArea.Autosize>
    </Stack>
  );
};

export default Chats;
