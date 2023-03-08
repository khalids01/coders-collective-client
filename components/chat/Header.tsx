import { Group, ActionIcon, Text, Stack } from "@mantine/core";
import Image from "next/image";
import moment from "moment";
import { Call, Video, Info } from "@/constants/icons";
import { useTheme, useUser } from "@/hooks";
import { showChatInfo } from "@/redux/slices/chatLayoutProps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ChatHeader = () => {
  const { user } = useUser();
  const { colors, colorScheme } = useTheme();
  const dispatch = useDispatch();
  const { showInfo } = useSelector(
    (state: RootState) => state.chatLayout.chatInfo
  );

  return (
    <Group
      position="apart"
      py={10}
      px={10}
      sx={{
        backgroundColor: colors.background.default,
      }}
    >
      <Group position="left" sx={{ width: "max-content" }}>
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt={user.userName}
            width={50}
            height={50}
            className="contain"
          />
        ) : null}
        <Stack spacing={0}>
          <Text color={colors.text.primary} size={18} weight={500}>
            Someone
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
