import { showChatInfo } from "@/redux/slices/chatLayoutProps";
import {
  ScrollArea,
  Text,
  Group,
  Stack,
  Title,
  CloseButton,
  Divider,
  Button,
  UnstyledButton,
} from "@mantine/core";
import { useTheme } from "@/hooks";
import { useDispatch } from "react-redux";
import { Block, Call, Right, Star, Trash, Video } from "@/constants/icons";
import { ProfileImage } from "@/components/common/sub";
import { User } from "@/types";

type Props =
  | {
      type: "user";
      user: User;
      group?: never;
    }
  | {
      type: "group";
      group: User;
      user?: never;
    };

const Info = ({ type, user }: Props) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  let details;

  if (type === "user") {
    details = {
      avatar: user.avatar,
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      description: user.description,
      contact: user.email,
    };
  }


  return (
    <ScrollArea.Autosize
      mah={"100vh"}
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
          <ProfileImage
            avatar={details?.avatar}
            first_name={details?.name as string}
            size={60}
          />
          <Stack spacing={0}>
            <Text size={20} weight={600} color={colors.text.primary}>
              {details?.name as string}
            </Text>
            <Text size={14} color={colors.text.primary}>
              {details?.contact as string}
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
            {details?.description}
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
export default Info