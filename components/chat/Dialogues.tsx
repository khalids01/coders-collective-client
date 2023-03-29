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
import { useLayout, useTheme } from "@/hooks";
import { Div } from "../common/sub";
import { useEffect, useState } from "react";
import {
  DotsY,
  Trash,
  MessageOff,
  Edit,
  Reply,
  SmileEmoji,
} from "@/constants/icons";

const messages = [
  {
    text: "START Receive Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue.",
    type: "other",
    time: "7:30 PM",
  },
  {
    text: "Send Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue.",
    type: "me",
    time: "7:30 PM",
  },
  {
    text: "Receive Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue.",
    type: "other",
    time: "7:30 PM",
  },
  {
    text: "Receive Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue.",
    type: "other",
    time: "7:30 PM",
  },
  {
    text: "Send Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue.",
    type: "me",
    time: "7:30 PM",
  },
  {
    text: "Receive Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue.",
    type: "other",
    time: "7:30 PM",
  },
  {
    text: "Receive Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue.",
    type: "other",
    time: "7:30 PM",
    images: ["/images/coding.jpg"],
  },
  {
    text: "Send Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue.",
    type: "me",
    time: "7:30 PM",
    images: ["/images/coding.jpg", "/images/coding.jpg"],
  },
  {
    text: "END Receive Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean eleifend laoreet congue.",
    type: "other",
    time: "7:30 PM",
    images: ["/images/coding.jpg", "/images/coding.jpg", "/images/coding.jpg"],
  },
];

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

const Dialogues = () => {
  const { colors } = useTheme();
  const { chatLayout } = useLayout();
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState<string>("");
  const [allImages, setAllImages] = useState<string[]>([]);

  useEffect(() => {
    const imgs = messages.map((msg) => {
      if (msg.images) {
        return msg.images;
      }
    });
    const newArr = imgs.flat().filter((value) => value !== undefined);
    setAllImages(newArr as string[]);
  }, [image]);

  return (
    <ScrollArea
      h={`calc(100vh - ${chatLayout.conversation.form.height}px)`}
      style={{
        borderTop: `1px solid ${colors.divider}`,
        borderBottom: `1px solid ${colors.divider}`,
      }}
    >
      <ImageModal opened={opened} setOpened={setOpened} images={allImages} />
      <Stack
        px={20}
        py={10}
        sx={{
          background: colors.background.neutral,
        }}
      >
        {messages?.map((obj, index) => {
          return (
            <Stack
              key={index}
              sx={{
                margin: obj.type === "other" ? "0 auto 0 0" : "0 0 0 auto",
                maxWidth: "70%",
              }}
            >
              <Text
                sx={{
                  display: "inline-block",
                  marginLeft: obj.type === "other" ? 5 : "auto !important",
                }}
                color="var(--textMuted)"
                mb={-15}
                ml={5}
                size={14}
              >
                {obj.time}
              </Text>
              <Div d="flex">
                {obj.type === "other" ? (
                  <MessageItemMenu type={obj.type} id={index} />
                ) : null}
                <Text
                  size={14}
                  color={obj.type === "other" ? colors.text.primary : "white"}
                  p="10px 20px"
                  sx={{
                    borderRadius: 16,
                    letterSpacing: 1.05,
                    backgroundColor:
                      obj.type === "other"
                        ? colors.background.lighter
                        : colors.card.focus,
                    lineHeight: 1.6,
                    marginLeft: obj.type === "other" ? 0 : "auto",
                  }}
                >
                  {obj.text}
                </Text>
                {obj.type !== "other" ? (
                  <MessageItemMenu type={"me"} id={index} />
                ) : null}
              </Div>
              {obj?.images ? (
                <Div
                  d="flex"
                  wrap
                  gap={16}
                  justifyContent={
                    obj.type === "other" ? "flex-start" : "flex-end"
                  }
                >
                  {obj?.images?.map((src: string, index: number) => {
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
            </Stack>
          );
        })}
      </Stack>
    </ScrollArea>
  );
};

export default Dialogues;
