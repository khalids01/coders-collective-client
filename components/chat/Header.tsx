import { Group, ActionIcon, Text, Stack } from "@mantine/core";
import moment from "moment";
import { Call, Video, Info } from "@/constants/icons";
import { useTheme } from "@/hooks";
import { showChatInfo } from "@/redux/slices/chatLayoutProps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileImage } from "../common/sub";

const ChatHeader = () => {
  const { colors, colorScheme } = useTheme();
  const dispatch = useDispatch();
  const { showInfo } = useSelector(
    (state: RootState) => state.chatLayout.chatInfo
  );
  const { activeChat } = useSelector((state: RootState) => state.chat);

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
      <Group position="left" sx={{ width: "max-content" }}>
        <ProfileImage
          avatar={activeChat?.avatar}
          first_name={activeChat?.first_name}
          last_name={activeChat?.last_name}
        />
        <Stack spacing={0}>
          <Text color={colors.text.primary} size={18} weight={500}>
            {activeChat?.first_name} {activeChat?.last_name}
          </Text>
          <Text color={colors.text.secondary} size={14} weight={300}>
            Last Seen {moment(Date.now()).calendar()}
          </Text>
        </Stack>
      </Group>

      <Group
        spacing={20}
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
          <Call size={24} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="transparent" radius={50} h={40} w={40}>
          <Video size={24} stroke={1.5} />
        </ActionIcon>
        {!showInfo ? (
          <ActionIcon
            onClick={() => dispatch(showChatInfo(!showInfo))}
            variant="transparent"
            radius={50}
            h={40}
            w={40}
          >
            <Info size={24} stroke={1.5} />
          </ActionIcon>
        ) : null}
      </Group>
    </Group>
  );
};

export default ChatHeader;
