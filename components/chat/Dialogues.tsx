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
import type { Message } from "@/types";
import { useBreakPoints, useMessage, useTheme, useUser } from "@/hooks";
import { Div } from "../common/sub";
import React, { useEffect, useState } from "react";
import {
  DotsY,
  Trash,
  MessageOff,
  Edit,
  Reply,
  SmileEmoji,
} from "@/constants/icons";

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
  images: string[];
}) => {
  return (
    <Modal
      styles={{
        root: {
          height: "100%",
        },
      }}
      size={"90%"}
      opened={opened}
      onClose={() => setOpened(!opened)}
    >
      {images?.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={image}
          height={500}
          width={900}
          className="contain"
        />
      ))}
    </Modal>
  );
};

const SingleMessage = ({ message }: { message: Message }) => {
  const { user } = useUser();
  const { colors } = useTheme();
  const [image, setImage] = useState<string>("");
  const [opened, setOpened] = useState(false);
  const { md } = useBreakPoints();

  const me = user?._id === message.senderId;

  const [allImages, setAllImages] = useState<string[]>([]);
  useEffect(() => {
    // const imgs = messages.map((msg) => {
    //   if (msg.images) {
    //     return msg.images;
    //   }
    // });
    // const newArr = imgs.flat().filter((value) => value !== undefined);
    // setAllImages(newArr as string[]);
  }, [image]);

  console.log(message)

  if(!user?._id) return <></>

  return (
    <Stack
      sx={{
        margin: user?._id === message.senderId ? "0 0 0 auto" : "0 auto 0 0",
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
        {me ? <MessageItemMenu type={"me"} id={me ? "me" : "other"} /> : null}
      </Div>
      {message.message?.images ? (
        <Div
          d="flex"
          wrap
          gap={16}
          justifyContent={!me ? "flex-start" : "flex-end"}
        >
          {message.message?.images?.map((src: string, index: number) => {
            return (
              <UnstyledButton
                key={index}
                onClick={() => {
                  setImage(src);
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
                  src={src}
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

      <ImageModal opened={opened} setOpened={setOpened} images={allImages} />
    </Stack>
  );
};

const Dialogues = ({ receiverId }: { receiverId: string }) => {
  const { colors } = useTheme();
  const { messages } = useMessage({ receiverId });
  const { md } = useBreakPoints();

  return (
    <ScrollArea
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
  );
};

export default Dialogues;
