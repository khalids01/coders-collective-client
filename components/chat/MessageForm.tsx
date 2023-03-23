import { Textarea, Text, Group, ActionIcon, Menu } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTheme } from "@/hooks";
import { Div } from "@/components/common/sub";
import {
  SmileEmoji,
  Send,
  DotsY,
  RichTextEdiror,
  ZipFile,
  Photo,
} from "@/constants/icons";
import data, { Skin } from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";

const MessageForm = () => {
  const { colors, colorScheme } = useTheme();

  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  const sendMessage = () => {
    console.log(form.values.message)
  };

  return (
    <Div
      d={"flex"}
      gap={10}
      sx={{ display: "flex", alignItems: "center" }}
      px={20}
      h={"auto"}
      bg={colors.background.paper}
    >
      <Textarea
        autosize
        py={16}
        minRows={1}
        maxRows={4}
        sx={{ width: "100%" }}
        {...form.getInputProps("message")}
        rightSection={
          <Menu
            trigger="click"
            position="top-end"
            closeOnItemClick={false}
            styles={{
              dropdown: {
                padding: "0 !important",
                borderRadius: 8,
                border: "none",
              },
            }}
          >
            <Menu.Target>
              <ActionIcon p={"0x 10px"} className="teal-on-hover">
                <SmileEmoji />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Picker
                theme={colorScheme}
                data={data}
                onEmojiSelect={(e: Skin) =>
                  form.setFieldValue("message", form.values.message + e?.native)
                }
              />
            </Menu.Dropdown>
          </Menu>
        }
        icon={
          <Menu
            trigger="click"
            position="top-start"
            classNames={{
              dropdown: "bg-paper",
              item: "text-primary teal-on-hover",
            }}
          >
            <Menu.Target>
              <ActionIcon p={"0x 10px"} className="teal-on-hover">
                <DotsY />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<RichTextEdiror size={16} stroke={1.8} />}>
                Rich Text Editor
              </Menu.Item>
              <Menu.Item icon={<Photo size={16} stroke={1.8} />}>
                Image
              </Menu.Item>
              <Menu.Item icon={<ZipFile size={16} stroke={1.8} />}>
                Zip File
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        }
        rightSectionWidth={50}
        styles={{
          input: {
            backgroundColor: colors.background.default,
            letterSpacing: 2,
            color: colors.text.primary,
            fontSize: 16,
          },
          icon: {
            pointerEvents: "painted",
          },
        }}
      />
      <ActionIcon onClick={() => sendMessage()} className="teal-on-hover">
        <Send />
      </ActionIcon>
    </Div>
  );
};

export default MessageForm;
