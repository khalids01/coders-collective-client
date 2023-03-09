import { showChatInfo } from "@/redux/slices/chatLayoutProps";
import {
  ScrollArea,
  Text,
  Group,
  Stack,
  Title,
  Drawer,
  CloseButton,
  Divider,
  Button,
  UnstyledButton,
} from "@mantine/core";
import { useBreakPoints, useMessage, useTheme } from "@/hooks";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Block, Call, Right, Star, Trash, Video } from "@/constants/icons";
import { RootState } from "@/redux/store";

const Info = () => {
  const { sendingTo } = useMessage();
  const dispatch = useDispatch();
  const { colors } = useTheme();

  return (
    <ScrollArea.Autosize
      maxHeight={"100vh"}
      sx={{ height: "100%" }}
      styles={{
        root: {
          height: "100%",
        },
      }}
    >
      <Group px={20} sx={{ height: 71 }} position="apart" className="border-b">
        <Title order={2}>Info</Title>
        <CloseButton onClick={() => dispatch(showChatInfo(false))} />
      </Group>
      <Stack px={20} py={20} spacing={0}>
        <Group>
          <Image
            src={sendingTo.avatar}
            alt={sendingTo.name}
            width={60}
            height={60}
            className="circle contain"
          />
          <Stack spacing={0}>
            <Text size={20} weight={600} color={colors.text.primary}>
              {sendingTo.name}
            </Text>
            <Text size={14} color={colors.text.primary}>
              {sendingTo.mobile}
            </Text>
          </Stack>
        </Group>

        <Group position="center" my={40}>
          <Button variant="outline">
            <Call size={18} />
            <Text size={16} component="span" ml={10}>
              Voice
            </Text>
          </Button>
          <Button variant="outline">
            <Video size={18} />
            <Text size={16} component="span" ml={10}>
              Video
            </Text>
          </Button>
        </Group>
        <Divider size={1} />
        <Stack spacing={10} my={40}>
          <Title color={colors.text.primary} order={3}>
            About
          </Title>
          <Text color={colors.text.secondary} size={16}>
            {sendingTo.about}
          </Text>
        </Stack>
        <Divider size={1} />
        <Group my={40} position="apart">
          <UnstyledButton sx={{ color: colors.text.primary, display: "flex" }}>
            <Star size={22} />
            <Text ml={16} component="span">
              Stared Messages
            </Text>
          </UnstyledButton>
          <Right />
        </Group>
        <Divider size={1} />
      </Stack>

      <Group grow p={20} mt="auto">
        <Button variant="outline">
          <Trash size={18} />
          <Text size={16} ml={10} component="span">
            Delete
          </Text>
        </Button>
        <Button variant="outline">
          <Block size={18} />
          <Text size={16} ml={10} component="span">
            Block
          </Text>
        </Button>
      </Group>
    </ScrollArea.Autosize>
  );
};

const LgScreenInfo = () => {
  const dispatch = useDispatch();
  const { showInfo } = useSelector(
    (state: RootState) => state.chatLayout.chatInfo
  );
  const { colors } = useTheme();


  return (
    <Drawer
      position="right"
      opened={showInfo}
      withCloseButton={false}
      onClose={() => dispatch(showChatInfo(!showInfo))}
      styles={{
        drawer:{
          backgroundColor: colors.background.default
        }
      }}
    >
      <Info />
    </Drawer>
  );
};

const ChatInfo = () => {
  const { lg } = useBreakPoints();
  // if (lg) {
  //   return <LgScreenInfo />;
  // }

  return (
    <aside className="bg-default border-l">
      {lg ? <LgScreenInfo /> : <Info />}
    </aside>
  );
};
export default ChatInfo;
