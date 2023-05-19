import {
  Group,
  ActionIcon,
  Text,
  Stack,
  ScrollArea,
  UnstyledButton,
  Modal,
  Menu,
  Loader,
  Avatar,
  Box,
  Tooltip,
  GroupPosition,
} from "@mantine/core";
import Image from "next/image";

import type { ImageData, Message, User } from "@/types";
import {
  useBreakPoints,
  useMessage,
  useTheme,
  useUser,
  useSets,
} from "@/hooks";
import { Div, ProfileImage } from "../common/sub";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  DotsY,
  Trash,
  MessageOff,
  Edit,
  Reply,
  SmileEmoji,
} from "@/constants/icons";
import { endpoints } from "@/constants";
import { useRouter } from "next/router";
import { useSockets } from "@/context/socket.context";
import { EVENTS } from "@/constants/socketConfig";
import dayjs from "dayjs";
import calender from "dayjs/plugin/calendar";
import type { TypingMessage } from "@/types/message";
import { useIntersection } from "@mantine/hooks";
import { SetsType } from "@/hooks/useSets";

const MessageItemMenu = ({
  id,
  type,
}: {
  id: string | number;
  type: "other" | "me";
}) => {
  const { colors } = useTheme();

  return (
    <Menu
      shadow={"md"}
      width={200}
      position={type === "me" ? "left-end" : "right-end"}
      styles={{
        dropdown: {
          background: colors.background.default,
        },

        item: {
          color: colors.text.primary,
          fontSize: 16,
        },
      }}
    >
      <Menu.Target>
        <ActionIcon>
          <DotsY size={18} color={colors.text.secondary} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<Edit size={17} />}>Edit</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<Reply size={17} />}>Reply</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<SmileEmoji size={17} />}>React to message</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<Trash size={17} />}>Delete</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<MessageOff size={17} />}>Unsend</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const ImageModal = ({
  opened,
  setOpened,
  images,
}: {
  opened: boolean;
  setOpened: any;
  images: ImageData[];
}) => {
  const { xs, md, xl } = useBreakPoints();

  return (
    <Modal
      fullScreen
      styles={{
        root: {
          height: "100%",
        },
        content: {
          overflow: "hidden",
        },
        body: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: 16,
          height: "100%",
          paddingTop: 20,
        },
        close: {
          transform: "scale(1.3)",
        },
      }}
      size={"100%"}
      opened={opened}
      onClose={() => setOpened(!opened)}
    >
      {images?.map((image, index) => {
        const NEW_WEIGHT = xs
          ? 300
          : md && image.width > 500
          ? 550
          : xl && image.width > 900
          ? 992
          : image.width > 1200
          ? 1250
          : 1080;
        const NEW_HEIGHT = (NEW_WEIGHT / image.width) * image.height;
        return (
          <Image
            key={image._id+index}
            src={`${endpoints.server.base}${endpoints.server.image}/${image.src}`}
            alt={image.src}
            height={NEW_HEIGHT}
            width={NEW_WEIGHT}
            className="contain"
          />
        );
      })}
    </Modal>
  );
};

interface Context {
  container: HTMLDivElement | null;
  seenSets?: SetsType;
}

const DialoguesContext = createContext<Context>({
  container: null,
});

const useSeenContext = () => useContext(DialoguesContext);

const SeenBy = ({
  seen,
  position,
}: {
  position: GroupPosition;
  seen: { user: User; time: string | Date }[];
}) => {
  const arr = seen.length > 10 ? seen.slice(0, 9) : seen;
  const { user } = useUser();

  return (
    <Group
      spacing={3}
      position={position}
      mt={-16}
      mr={position === "right" ? 65 : 0}
      ml={position === "left" ? 65 : 0}
    >
      {arr
        ? arr?.map((arrItem, i) => {
            if (arrItem.user.username === user?.username) return <></>;
            return (
              <Tooltip
                className="tooltip"
                key={arrItem.user._id + i}
                label={
                  <Group>
                    <Text>
                      {arrItem.user.username} at{" "}
                      {dayjs.utc(arrItem.time).calendar()}
                    </Text>
                  </Group>
                }
              >
                <Avatar radius={50} size={16}>
                  {!!String(arrItem.user.avatar).trim() ? (
                    <Image
                      src={arrItem.user.avatar}
                      alt={arrItem.user.username}
                      height={16}
                      width={16}
                      style={{
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                  ) : (
                    <Box
                      bg="var(--card-focus)"
                      display={"grid"}
                      p={10}
                      w={16}
                      h={16}
                      sx={{ placeContent: "center", borderRadius: 100 }}
                    >
                      <Text
                        size={10}
                        component="span"
                        color="var(--card-text)"
                        pt={2}
                        weight={700}
                        align="center"
                      >
                        {arrItem.user.username[0].toUpperCase()}
                      </Text>
                    </Box>
                  )}
                </Avatar>
              </Tooltip>
            );
          })
        : null}

      {seen && seen.length > 10 ? (
        <Menu position="left-end">
          <Menu.Target>
            <UnstyledButton>{seen.length - arr.length} more</UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <ScrollArea.Autosize mah={350}>
              {seen &&
                seen.map((item, i) => {
                  if (item.user._id === user?._id) return <></>;
                  return (
                    <Menu.Item key={`${item.user.username}${i}`}>
                      <Group>
                        <ProfileImage
                          avatar={item.user.avatar}
                          username={item.user.username}
                          size={25}
                        />
                        <Text>{item.user.username}</Text>
                        <Text>{dayjs.utc(item.time).calendar()}</Text>
                      </Group>
                    </Menu.Item>
                  );
                })}
            </ScrollArea.Autosize>
          </Menu.Dropdown>
        </Menu>
      ) : null}
    </Group>
  );
};

const SingleMessage = ({
  message,
  showSeenBy,
}: {
  message: Message;
  showSeenBy: boolean;
}) => {
  dayjs.extend(calender);
  const { user } = useUser();
  const { colors } = useTheme();
  const [opened, setOpened] = useState(false);
  const { container, seenSets } = useSeenContext();
  const me = user?._id === message.sender.id;
  const { md } = useBreakPoints();
  const { messageSeenMutation, messageAfterSeenData, messageSeenSuccess } =
    useMessage();
  const { ref, entry } = useIntersection({
    root: container,
    threshold: 1,
  });

  const Options = () => {
    return (
      <Group
        spacing={0}
        miw={60}
        sx={{
          flexDirection: me ? "row-reverse" : "row",
        }}
      >
        <MessageItemMenu type={me ? "me" : "other"} id={message._id} />
        <ProfileImage
          username={message.sender.username}
          avatar={message.sender.avatar}
          size={30}
        />
      </Group>
    );
  };

  const seen = message?.seen?.find(
    (item) => item.user.username === user?.username
  );
  useEffect(() => {
    if (!seenSets) return;
    const { sets } = seenSets;
    if (entry?.isIntersecting && !seen) {
      const id = entry.target.getAttribute("id") as string;
      if (sets.has(id)) return;

      messageSeenMutation(id);
    }
  }, [entry?.isIntersecting]);

  useEffect(() => {
    if (!messageSeenSuccess || !seenSets) return;
    const newMsg: Message = messageAfterSeenData.data ?? {};
    message = {
      ...message,
      seen: newMsg.seen,
    };
    const { push } = seenSets;
    push(message._id);
  }, [messageSeenSuccess]);

  useEffect(() => {
    if (!seenSets) return;
    const { sets } = seenSets;
  }, [seenSets?.sets]);

  if (!user?._id) return <></>;

  const alreadySeen =
    message.sender.username !== user?.username &&
    message.seen?.find((u) => u.user.username === user?.username);

  return (
    <Box
      py={10}
      px={md ? 5 : 12}
      sx={{
        background:
          message.sender.username === user?.username || alreadySeen
            ? "transparent"
            : colors.background.lighter,
      }}
    >
      <Stack
        pr={8}
        ref={seen || message.sender.id === user._id ? null : ref}
        id={message._id}
        sx={{
          margin: user?._id === message.sender.id ? "0 0 0 auto" : "0 auto 0 0",
          maxWidth: "70%",
        }}
      >
        {/* Date */}
        <Text
          sx={{
            display: "inline-block",
            textAlign: me ? "end" : "start",
          }}
          color="var(--textMuted)"
          mb={-10}
          mr={me ? 30 : 0}
          ml={me ? 0 : 30}
          size={12}
        >
          {dayjs(message.updatedAt).calendar()}
        </Text>

        <Div
          d="flex"
          items="flex-start"
          justifyContent={me ? "flex-end" : "flex-start"}
        >
          {message.message.text?.length > 0 ? (
            <>
              {!me ? <Options /> : null}
              <Text
                size={14}
                color={!me ? colors.text.primary : "white"}
                p="10px 20px"
                mx={10}
                sx={{
                  borderRadius: 16,
                  letterSpacing: 1.05,
                  backgroundColor: !me
                    ? colors.background.lighter
                    : colors.card.focus,
                  lineHeight: 1.6,
                  marginLeft: !me ? 0 : "auto",
                }}
              >
                {message.message.text}
              </Text>
              {me ? <Options /> : null}
            </>
          ) : null}
        </Div>

        <Div d="flex" justifyContent="flex-end">
          {message.message.images?.length > 0 && !me ? (
            <>
              <MessageItemMenu type={"me"} id={me ? "me" : "other"} />
              <ProfileImage
                size={30}
                avatar={message.sender?.avatar}
                username={message.sender?.username}
              />
            </>
          ) : null}

          {message.message?.images ? (
            <Div
              d="flex"
              wrap
              gap={16}
              justifyContent={!me ? "flex-start" : "flex-end"}
            >
              {message.message?.images?.map((img: any, index: number) => {
                return (
                  <UnstyledButton
                    key={`${img}-${index}`}
                    onClick={() => {
                      setOpened(!opened);
                    }}
                    mx={10}
                    sx={{
                      display: "inline-block",
                      transition: "all 0.2s",
                      "&:hover": {
                        scale: "104%",
                      },
                    }}
                  >
                    <Image
                      src={`${endpoints.server.base}${endpoints.server.image}/${img.src}`}
                      alt={"Image"}
                      width={100}
                      height={100}
                      className="cover"
                      style={{ borderRadius: 12 }}
                    />
                  </UnstyledButton>
                );
              })}
            </Div>
          ) : null}

          {message.message.images?.length > 0 && me ? (
            <>
              <ProfileImage
                size={30}
                avatar={message.sender?.avatar}
                username={message.sender?.username}
              />
              <MessageItemMenu type={"me"} id={me ? "me" : "other"} />
            </>
          ) : null}
        </Div>

        {message.message.images?.length > 0 ? (
          <ImageModal
            opened={opened}
            setOpened={setOpened}
            images={message.message.images as unknown as ImageData[]}
          />
        ) : null}

        {message.seen ? (
          <SeenBy
            seen={message.seen}
            position={
              message.sender.username === user?.username ? "right" : "left"
            }
          />
        ) : null}
      </Stack>
    </Box>
  );
};

const Dialogues = ({ chat_name }: { chat_name: string }) => {
  const { colors } = useTheme();
  const { messages } = useMessage();
  const router = useRouter();
  const setsState = useSets();
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const [typingMessage, setTypingMessage] = useState<TypingMessage>();
  const { socket } = useSockets();
  const stackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function startAtBottom() {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      try {
        containerRef.current?.firstElementChild?.nextElementSibling?.classList?.add(
          "SELECTED"
        );
        if (containerRef.current.querySelector(".SELECTED")) {
          containerRef.current
            .querySelector(".SELECTED")
            ?.scrollBy(
              0,
              containerRef.current.querySelector(".SELECTED")?.scrollHeight ??
                500
            );
        }
      } catch (err) {
        scrollToBottom();
      }
    }
  }

  useEffect(() => {
    // scrollToBottom();
    startAtBottom();
    router.events.on("routeChangeComplete", scrollToBottom);

    return () => {
      router.events.off("hashChangeComplete", scrollToBottom);
    };
  }, [messages.data?.length]);

  useEffect(() => {
    socket.on(
      EVENTS.CLIENT.TYPING_MESSAGE_GET,
      ({ sender, receiver, message }) => {
        setTypingMessage({ sender, receiver, message });
      }
    );
  }, []);

  const checkIfSeenByToShow = ({
    message,
    arr,
    index,
  }: {
    arr: Message[];
    index: number;
    message: Message;
  }): boolean => {
    if (index > 0) {
      // const previousSeen = arr[index - 1].seen?.map(
      //   (s: { user: User; time: string | Date }) => s.user._id
      // );
      // const currentSeen = m.seen?.map((s) => s.user._id);
      // showSeenBy = currentSeen.some((userId: string) =>
      //   previousSeen.includes(userId)
      // );
    } else if (
      arr.length - 1 === index &&
      arr[arr.length - 1].sender.id !== user?._id
    ) {
      return true;
    }

    return false;
  };

  return (
    <DialoguesContext.Provider
      value={{
        container: containerRef.current,
        seenSets: setsState,
      }}
    >
      <ScrollArea
        ref={containerRef}
        style={{
          borderTop: `1px solid ${colors.divider}`,
          borderBottom: `1px solid ${colors.divider}`,
          background: colors.background.neutral,
        }}
        styles={{
          root: {
            position: "relative",
          },
        }}
      >
        <Stack
          py={10}
          h={"100%"}
          spacing={0}
          ref={stackRef}
          sx={{
            background: colors.background.neutral,
            height: "100%",
          }}
        >
          {Array.from(messages?.data)
            ? Array.from(messages?.data)?.map(
                (m: Message, index: number, arr) => {
                  return (
                    <React.Fragment key={index}>
                      <SingleMessage
                        message={m}
                        showSeenBy={checkIfSeenByToShow({
                          arr,
                          index,
                          message: m,
                        })}
                        key={index}
                      />
                    </React.Fragment>
                  );
                }
              )
            : null}
        </Stack>
        <div ref={targetRef} />
        {String(typingMessage?.message.text).trim() &&
        typingMessage?.sender?.username === chat_name ? (
          <Group pos="absolute" bottom={0} left={0} ml={20} pb={10}>
            <Loader variant="dots" size={"md"} color={colors.text.secondary} />
          </Group>
        ) : null}
      </ScrollArea>
    </DialoguesContext.Provider>
  );
};

export default Dialogues;
