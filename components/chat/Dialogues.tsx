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
} from "@mantine/core";
import Image from "next/image";
import moment from "moment";
import type { ImageData, Message } from "@/types";
import { useBreakPoints, useMessage, useTheme, useUser } from "@/hooks";
import { Div } from "../common/sub";
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
import { useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";

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
          <DotsY size={20} />
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
  const { user } = useUser();
  const { colors } = useTheme();
  const [image, setImage] = useState<string>("");
  const [opened, setOpened] = useState(false);
  const { md } = useBreakPoints();

  const me = user?._id === message.sender;

  const [allImages, setAllImages] = useState<string[]>([]);

  if (!user?._id) return <></>;

  return (
    <Stack
      pr={8}
      sx={{
        margin: user?._id === message.sender ? "0 0 0 auto" : "0 auto 0 0",
        maxWidth: "70%",
      }}
    >
      <Text
        sx={{
          display: "inline-block",
          textAlign: me ? "end" : "start",
        }}
        color="var(--textMuted)"
        mb={-10}
        mr={me ? 30 : 0}
        ml={me ? 0 : 30}
        size={md ? 11 : 14}
      >
        {moment(message.updatedAt).calendar()}
      </Text>
      <Div d="flex" items="center">
        {message.message.text?.length > 0 ? (
          <>
            {!me ? (
              <MessageItemMenu type={me ? "me" : "other"} id={message._id} />
            ) : null}
            <Text
              size={14}
              color={!me ? colors.text.primary : "white"}
              p="10px 20px"
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
            {me ? (
              <MessageItemMenu type={"me"} id={me ? "me" : "other"} />
            ) : null}
          </>
        ) : null}
      </Div>
      <Div d="flex" justifyContent="flex-end">
        {message.message.text?.length > 0 && !me ? (
          <MessageItemMenu type={"me"} id={me ? "me" : "other"} />
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
                    setImage(img.src);
                    setOpened(!opened);
                  }}
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

        {message.message.text?.length > 0 && me ? (
          <MessageItemMenu type={"me"} id={me ? "me" : "other"} />
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

const Dialogues = ({ receiverId }: { receiverId: string }) => {
  const { colors } = useTheme();
  const { messages } = useMessage({ receiverId });
  const { md } = useBreakPoints();
  const router = useRouter()
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    axis: "y",
    duration: 1,
  });

  // const targetRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>{
    targetRef?.current?.scrollTo({
      top: targetRef?.current?.scrollHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    scrollToBottom()
    // router.events.on('routeChangeComplete', scrollToBottom);

    // Remove the event listener when the component unmounts
    // return () => {
      // router.events.off('hashChangeComplete', scrollToBottom);
    // };
  }, []);

  return (
    <>
      <ScrollArea
        viewportRef={targetRef}
        style={{
          borderTop: `1px solid ${colors.divider}`,
          borderBottom: `1px solid ${colors.divider}`,
          background: colors.background.neutral,
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
      </ScrollArea>
    </>
  );
};

export default Dialogues;
