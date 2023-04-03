import { Group, ActionIcon, Text, Stack, Burger, Drawer } from "@mantine/core";
import moment from "moment";
import { Call, Video, Info } from "@/constants/icons";
import { useBreakPoints, useTheme, useChat } from "@/hooks";
import { showChatInfo } from "@/redux/slices/chatLayoutProps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileImage } from "../common/sub";
import { showMainNavDrawer } from "@/redux/slices/chatLayoutProps";
import { Info as ChatInfo } from "./info";
import { MobileNavbarDrawer } from "@/components/mainLayout/nav";

const ChatHeader = ({ receiverId }: { receiverId: string }) => {
  const { colors, colorScheme } = useTheme();
  const { md } = useBreakPoints();
  const dispatch = useDispatch();
  const { chatData } = useChat({ id: receiverId, type: "user" });
  const { showInfo } = useSelector(
    (state: RootState) => state.chatLayout.chatInfo
  );

  const { show: showDrawer } = useSelector(
    (state: RootState) => state.chatLayout.mainNavDrawer
  );

  return (
    <Group
      position="apart"
      py={10}
      px={10}
      mih={70}
      sx={{
        backgroundColor: colors.background.default,
      }}
    >
      <Group position="left" spacing={md ? 10 : 20} sx={{ width: "max-content" }}>
        <ProfileImage size={md ? 35 : 40} avatar={""} first_name={"test"} last_name={"account"} />
        <Stack spacing={0}>
          <Text color={colors.text.primary} size={md ? 16 : 18} weight={500}>
            {chatData?.type === "user"
              ? `${chatData?.data?.first_name} ${chatData?.data?.first_name}`
              : ""}
          </Text>
          <Text color={colors.text.secondary} size={md ? 11 : 14} weight={400}>
            {moment(Date.now()).calendar()}
          </Text>
        </Stack>
      </Group>

      <Group
        spacing={md ? 8 : 20}
        position="right"
        sx={{
          width: "max-content",
          button: {
            transition: "all 0.3s",
            "&:hover": {
              color: colorScheme === "dark" ? colors.teal : colors.blue,
            },
          },
        }}
      >
        <ActionIcon variant="transparent" radius={50} h={40} w={40}>
          <Call size={ md ? 20 : 24} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="transparent" radius={50} h={40} w={40}>
          <Video size={ md ? 20 : 24} stroke={1.5} />
        </ActionIcon>
        <>
          <ActionIcon
            onClick={() => dispatch(showChatInfo(!showInfo))}
            variant="transparent"
            radius={50}
            h={40}
            w={40}
          >
            <Info size={ md ? 20 : 24} stroke={1.5} />
          </ActionIcon>
          <Drawer
            position="right"
            withCloseButton={false}
            size={340}
            opened={showInfo}
            onClose={() => dispatch(showChatInfo(false))}
          >
            {chatData?.type === "user" ? (
              <ChatInfo type={"user"} user={chatData.data} />
            ) : null}
          </Drawer>
        </>
        {md && (
          <>
            <Burger
              opened={showDrawer}
              onClick={() => dispatch(showMainNavDrawer(!showDrawer))}
              size='sm'
              color={colors.text.secondary}
            />
            <MobileNavbarDrawer />
          </>
        )}
      </Group>
    </Group>
  );
};

export default ChatHeader;
