import {
  Textarea,
  createStyles,
  ActionIcon,
  Menu,
  Modal,
  Box,
  Text,
  UnstyledButton,
  CloseButton,
  FileButton,
  ScrollArea,
  Group,
  TextInput,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDebouncedState, useElementSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  useArray,
  useBreakPoints,
  useMessage,
  useTheme,
  useUser,
} from "@/hooks";
import { Div } from "@/components/common/sub";
import Image from "next/image";
import {
  SmileEmoji,
  Send,
  DotsY,
  RichTextEditor,
  ZipFile,
  Photo,
  CheckIcon,
  PhotoCancel,
  Plus,
} from "@/constants/icons";
import data, { Skin } from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useDispatch } from "react-redux";
import { formHeight } from "@/redux/slices/chatLayoutProps";
import { useEffect, useRef } from "react";
import { ColorsType } from "@/hooks/useTheme";
import { useSockets } from "@/context/socket.context";
import { EVENTS } from "@/constants/socketConfig";
import { useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "@/constants";

const useStyles = createStyles((theme, colors: ColorsType) => ({
  form: {
    width: "100%",
  },
  action_elements: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    columnGap: 16,
  },
  submit: {
    rotate: "44deg",
  },
  inner_wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  preview: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 16,
    marginTop: 20,
  },
  preview_img: {
    img: {
      objectFit: "cover",
      objectPosition: "top center",
    },
  },
  root: {
    background: colors.background.lighter,
    border: "none",
    borderRadius: 6,
    height: 70,
    width: 70,
    marginBottom: 16,
    transition: "all 0.3s",
    "&:hover": {
      background: colors.background.neutral,
    },
  },
  inner: {
    display: "grid",
    placeItems: "center",
    height: "100%",
  },
  addBtn: {
    display: "grid",
    placeItems: "center",
    transition: "all 0.3s",
    borderRadius: 8,
    "&:hover": {
      background: colors.background.lighter,
    },
  },
}));

const DroppedImagesPreview = ({
  array,
  push,
  remove,
  size = 100,
}: {
  array: FileWithPath[];
  push: Function;
  remove: Function;
  size?: number;
}) => {
  const { colors } = useTheme();
  const { classes } = useStyles(colors);

  useEffect(()=>{}, [])

  return (
    <ScrollArea.Autosize mah={200}>
      <Box className={classes.preview}>
        {array
          ? array?.map((file: File, index: number) => {
              const imageUrl = URL.createObjectURL(file);
              return (
                <Box
                  key={index}
                  className={classes.preview_img}
                  pos="relative"
                  sx={{
                    "&:hover": {
                      button: {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <CloseButton
                    pos={"absolute"}
                    variant="filled"
                    top={5}
                    left={5}
                    size={size > 90 ? "md" : "sm"}
                    opacity={0}
                    onClick={() => {
                      remove(index);
                    }}
                  />
                  <Image
                    alt={imageUrl}
                    src={imageUrl}
                    height={size}
                    width={size}
                    style={{
                      borderRadius: 6,
                    }}
                  />
                </Box>
              );
            })
          : null}

        <Dropzone
          onDrop={(e) => push(...e)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          classNames={{
            root: classes.root,
            inner: classes.inner,
          }}
        >
          <Box className={classes.inner_wrapper}>
            <Dropzone.Accept>
              <CheckIcon />
            </Dropzone.Accept>

            <Dropzone.Reject>
              <PhotoCancel />
            </Dropzone.Reject>

            <Dropzone.Idle>
              <Plus size={30} />
            </Dropzone.Idle>
          </Box>
        </Dropzone>
      </Box>
    </ScrollArea.Autosize>
  );
};

const MessageForm = ({ chat_name }: { chat_name: string }) => {
  const { height: inputHeight, ref } = useElementSize();
  const { colors, colorScheme } = useTheme();
  const { sendMessage, sendMessageSuccess } = useMessage();
  const { classes } = useStyles(colors);
  const dispatch = useDispatch();
  const { socket } = useSockets();
  const { user } = useUser();
  const queryClient = useQueryClient();

  // state for images array
  const { array, push, pushFlattenArray, removeByIndex, clear } = useArray([]);
  useEffect(() => {
    dispatch(formHeight(inputHeight));
  }, [inputHeight]);

  useEffect(() => {
    if (sendMessageSuccess) {
      form.reset();
      clear();
      socket.emit(EVENTS.CLIENT.TYPING_MESSAGE, {
        sender: {
          username: user?.username,
        },
        receiver: {
          username: chat_name,
        },
        message: {
          text: "",
        },
      });

      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.lastMessage + chat_name],
        exact: true,
      });

    }
  }, [sendMessageSuccess]);

  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  const handleSendMessage = (values: typeof form.values) => {
    if (
      (array.length === 0 && values.message.trim()?.length === 0) ||
      !chat_name
    ) {
      return;
    }

    const formData = new FormData();

    formData.append("chat_name", chat_name);
    formData.append("message", form.values.message);

    for (let i = 0; i < array.length; i++) {
      formData.append("images", array[i], array[i].name);
    }

    sendMessage(formData);
  };

  const handleInputChange = (e: any) => {
    form.setFieldValue("message", e.target.value);
    socket.emit(EVENTS.CLIENT.TYPING_MESSAGE, {
      sender: {
        username: user?.username,
      },
      receiver: {
        username: chat_name,
      },
      message: {
        text: e.target.value,
      },
    });
  };

  return (
    <Div
      d={"flex"}
      gap={10}
      sx={{ display: "flex", alignItems: "center" }}
      px={20}
      pb={array.length > 0 ? 20 : 0}
      h={"auto"}
      bg={colors.background.paper}
    >
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleSendMessage(values))}
        ref={ref}
      >
        {array.length > 0 ? (
          <Box py={12}>
            <DroppedImagesPreview
              array={array as FileWithPath[]}
              push={push}
              remove={removeByIndex}
              size={70}
            />
          </Box>
        ) : null}
        <div className={classes.action_elements}>
          <TextInput
            // autosize
            // py={md ? 0 : 16}
            // minRows={1}
            // maxRows={4}
            size={'lg'}
            sx={{ width: "100%" }}
            onChange={handleInputChange}
            value={form.values.message}
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
                    onEmojiSelect={(e: Skin) => {
                      form.setFieldValue(
                        "message",
                        form.values.message + e?.native
                      );
                      socket.emit(EVENTS.CLIENT.TYPING_MESSAGE, {
                        sender: {
                          username: user?.username,
                        },
                        receiver: {
                          username: chat_name,
                        },
                        message: {
                          text: e?.native,
                        },
                      });
                    }}
                  />
                </Menu.Dropdown>
              </Menu>
            }
            icon={
              <Group spacing={0}>
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
                      <DotsY size={20} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item icon={<RichTextEditor size={16} stroke={1.8} />}>
                      Rich Text Editor
                    </Menu.Item>
                    <Menu.Item
                      // onClick={open}
                      icon={<Photo size={16} stroke={1.8} />}
                    >
                      Image
                    </Menu.Item>
                    <Menu.Item icon={<ZipFile size={16} stroke={1.8} />}>
                      Zip File
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <FileButton
                  multiple
                  onChange={(f: FileWithPath[]) => pushFlattenArray(f)}
                  accept={"image/png,image/jpeg,image/jpg"}
                >
                  {(props) => (
                    <UnstyledButton {...props} className={classes.addBtn}>
                      <Photo size={22} stroke={1.8} />
                    </UnstyledButton>
                  )}
                </FileButton>
              </Group>
            }
            rightSectionWidth={50}
            iconWidth={60}
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
          <ActionIcon
            type="submit"
            className={`teal-on-hover ${classes.submit}`}
          >
            <Send />
          </ActionIcon>
        </div>
      </form>
    </Div>
  );
};

export default MessageForm;
