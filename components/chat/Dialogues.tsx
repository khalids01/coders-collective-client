import {
  Group,
  ActionIcon,
  Text,
  Stack,
  ScrollArea,
  UnstyledButton,
  Modal,
  Menu,
  Box,
  Loader,
} from "@mantine/core";
import Image from "next/image";
import type { ImageData, Message } from "@/types";
import {
  useBreakPoints,
  useChat,
  useMessage,
  useTheme,
  useUser,
} from "@/hooks";
import { Div, ProfileImage } from "../common/sub";
import React, { useEffect, useRef, useState } from "react";
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
            key={index}
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

const SingleMessage = ({ message }: { message: Message }) => {
  dayjs.extend(calender);
  const { user } = useUser();
  const { colors } = useTheme();
  const [opened, setOpened] = useState(false);

  const me = user?._id === message.sender.id;

  // const [allImages, setAllImages] = useState<string[]>([]);

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

  if (!user?._id) return <></>;

  return (
    <Stack
      pr={8}
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
        {dayjs().calendar(dayjs(message.updatedAt))}
      </Text>

      <Div d="flex" items="flex-start" justifyContent={me ? 'flex-end' : 'flex-start'}>
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
                  key={index}
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
    </Stack>
  );
};

const Dialogues = ({ chat_name }: { chat_name: string }) => {
  const { colors } = useTheme();
  const { messages } = useMessage();
  const { md } = useBreakPoints();
  const router = useRouter();

  const [typingMessage, setTypingMessage] = useState<TypingMessage>();
  const { socket } = useSockets();

  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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

  return (
    <>
      <ScrollArea
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
          px={md ? 5 : 12}
          py={10}
          h={"100%"}
          sx={{
            background: colors.background.neutral,
            height: "100%",
          }}
        >
          {messages?.data
            ? messages?.data?.map((m: Message, index: number) => (
                <React.Fragment key={index}>
                  <SingleMessage message={m} key={index} />
                </React.Fragment>
              ))
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
    </>
  );
};

export default Dialogues;
