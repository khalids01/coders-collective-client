import { useTheme } from "@/hooks";
import { User } from "@/types";
import {
  Card,
  Text,
  createStyles,
  Group,
  Stack,
  Box,
  Button,
  Badge,
} from "@mantine/core";
import Image from "next/image";
import CompactText from "./CompactText";

const useStyle = createStyles({
  cover: {},
});

const UserCard = ({ user }: { user: User }) => {
    const {colors} = useTheme()
  return (
    <Card bg={colors.background.default}>
      <Card.Section>
        {user.avatar.length > 0 ? (
          <Image
            src={user.avatar}
            alt={user.user_name}
            height={250}
            width={350}
            className={"object-cover"}
          />
        ) : (
          <Box
            display={"grid"}
            h={170}
            w={300}
            fw={700}
            bg='rgba(16,71,173,0.08)'
            sx={{
              justifyContent: "center",
              alignContent:'center',
              fontSize: 50,
              textTransform: 'uppercase'
            }}
          >
            {user.first_name[0]}
            {user.last_name ? user.last_name[0] : ""}
          </Box>
        )}
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <CompactText
          text={`${user.first_name} ${user.last_name}`}
          length={20}
        />
        <Badge color="cyan" variant="light">
          Developer
        </Badge>
      </Group>

      <CompactText
        text={user.description ? user.description : "No description added"}
        length={50}
      />

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Connect
      </Button>
    </Card>
  );
};

export default UserCard;
