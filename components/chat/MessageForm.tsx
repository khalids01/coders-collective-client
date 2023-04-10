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
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useElementSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useBreakPoints, useMessage, useTheme, useUser } from "@/hooks";
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
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ColorsType } from "@/hooks/useTheme";

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
    height: 200,
    width: 200,
    marginBottom: 16,
    marginInline: "auto",
    display: "grid",
    placeItems: "center",
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
  images,
  setImages,
  size = 100,
}: {
  images: FileWithPath[];
  setImages: any;
  size?: number;
}) => {
  const { colors } = useTheme();
  const { classes } = useStyles(colors);
  return (
    <ScrollArea.Autosize mah={200}>
      <Box className={classes.preview}>
        {images?.map((file: File, index: number) => {
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
                  const newArr = images.filter((f) => f.name !== file.name);
                  setImages(newArr);
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
        })}

        <FileButton
          onChange={(f) => setImages([...images, ...f])}
          multiple
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <UnstyledButton
              {...props}
              h={size}
              w={size}
              className={classes.addBtn}
            >
              <Plus size={30} />
            </UnstyledButton>
          )}
        </FileButton>
      </Box>
    </ScrollArea.Autosize>
  );
};

const MessageForm = ({ receiverId }: { receiverId: string }) => {
  const { height: inputHeight, ref } = useElementSize();
  const { colors, colorScheme } = useTheme();
  const { sendMessage, sentMessageSuccess, setSendMessageData } = useMessage();
  const { user } = useUser();
  const { classes } = useStyles(colors);
  const dispatch = useDispatch();
  const { md } = useBreakPoints();
  const [opened, { open, close }] = useDisclosure(false);
  const [images, setImages] = useState<FileWithPath[] | []>([]);

  useEffect(() => {
    dispatch(formHeight(inputHeight));
  }, [inputHeight]);

  useEffect(() => {
    if (sentMessageSuccess) {
      form.reset();
      setImages([]);
    }
  }, [sentMessageSuccess]);

  const form = useForm({
    initialValues: {
      message: "",
    },
  });
  const handleFileSelect = (filesArr: FileWithPath[]) => {
    if (filesArr.length === 0) return;

    let newArr = [...images, ...filesArr];
    setImages(newArr as FileWithPath[]);
  };

  const handleSendMessage = (values: typeof form.values) => {
    if (
      (images.length === 0 && values.message.trim()?.length === 0) ||
      !receiverId
    ) {
      return;
    }

    const formData = new FormData();

    formData.append("receiverId", receiverId);
    formData.append("message", form.values.message);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i], images[i].name);
    }

    setSendMessageData({
      sender: user?._id as string,
      receiver: receiverId,
      message: {
        text: form.values.message,
        images: [],
      },
    });

    sendMessage(formData);
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
      <Modal
        opened={opened}
        onClose={close}
        title={"Select Image"}
        styles={{
          header: {
            background: colors.background.paper,
          },
          content: {
            background: colors.background.paper,
          },
        }}
      >
        <Dropzone
          onDrop={handleFileSelect}
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
              <Image
                alt="accept"
                src="/images/drop.png"
                width={90}
                height={70}
                className="object-contain"
              />
            </Dropzone.Idle>

            <div>
              <Text
                style={{ maxWidth: "25ch" }}
                mt={15}
                size={12}
                align="center"
              >
                <span>Drop your images here, or select</span>
                <Text component="span" pl={5} inline color="#00D4FF">
                  click to browse
                </Text>
              </Text>
            </div>
          </Box>
        </Dropzone>

        {images.length > 0 ? (
          <DroppedImagesPreview
            images={images as FileWithPath[]}
            setImages={setImages}
          />
        ) : null}
      </Modal>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleSendMessage(values))}
        ref={ref}
      >
        {images.length > 0 ? (
          <Box py={12}>
            <DroppedImagesPreview
              images={images as FileWithPath[]}
              setImages={setImages}
              size={60}
            />
          </Box>
        ) : null}
        <div className={classes.action_elements}>
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
                      <DotsY />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item icon={<RichTextEditor size={16} stroke={1.8} />}>
                      Rich Text Editor
                    </Menu.Item>
                    <Menu.Item
                      onClick={open}
                      icon={<Photo size={16} stroke={1.8} />}
                    >
                      Image
                    </Menu.Item>
                    <Menu.Item icon={<ZipFile size={16} stroke={1.8} />}>
                      Zip File
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <UnstyledButton
                  onClick={open}
                  display="grid"
                  sx={{ placeItems: "center" }}
                >
                  <Photo size={24} stroke={1.8} />
                </UnstyledButton>
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
