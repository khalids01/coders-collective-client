import { Textarea, createStyles, ActionIcon, Menu } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useBreakPoints, useMessage, useTheme, useUser } from "@/hooks";
import { Div } from "@/components/common/sub";
import {
  SmileEmoji,
  Send,
  DotsY,
  RichTextEditor,
  ZipFile,
  Photo,
} from "@/constants/icons";
import data, { Skin } from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useDispatch } from "react-redux";
import { formHeight } from "@/redux/slices/chatLayoutProps";
import { useEffect } from "react";

const useStyles = createStyles({
  form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    columnGap: 16,
  },
  submit: {
    rotate: "44deg",
  },
});

const MessageForm = ({ receiverId }: { receiverId: string }) => {
  const { height: inputHeight, ref } = useElementSize();
  const { colors, colorScheme } = useTheme();
  const { sendMessage, sentMessageSuccess } = useMessage({ receiverId });
  const { user } = useUser();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const {md} = useBreakPoints()

  useEffect(() => {
    dispatch(formHeight(inputHeight));
  }, [inputHeight]);

  useEffect(() => {
    if (sentMessageSuccess) {
      form.reset();
    }
  }, [sentMessageSuccess]);

  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  const handleSendMessage = (values: typeof form.values) => {
    if (values.message.trim()?.length === 0 || !receiverId) return;

    sendMessage({
      message: values.message,
      senderName: `${user?.first_name as string} ${user?.last_name as string}`,
      receiverId,
    });
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
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleSendMessage(values))}
        ref={ref}
      >
        <Textarea
          autosize
          // py={md ? 0 : 16}
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
                    form.setFieldValue(
                      "message",
                      form.values.message + e?.native
                    )
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
                <Menu.Item icon={<RichTextEditor size={16} stroke={1.8} />}>
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
        <ActionIcon type="submit" className={`teal-on-hover ${classes.submit}`}>
          <Send />
        </ActionIcon>
      </form>
    </Div>
  );
};

export default MessageForm;
