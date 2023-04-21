import Image from "next/image";
import { Avatar, Box, Text } from "@mantine/core";

type Props = {
  username: string;
  avatar: string | undefined;
  size?: number;
};

const ProfileImage = ({ username, avatar, size }: Props) => {
  return (
    <Avatar radius={size ? size * 2 : 50} size={size}>
      {avatar && avatar?.length > 0 ? (
        <Image
          src={avatar}
          alt={username as string}
          height={size ? size : 48}
          width={size ? size : 48}
          className="cover"
        />
      ) : (
        <Box
          bg="var(--card-focus)"
          display={"grid"}
          p={10}
          w={size ? size : 48}
          h={size ? size : 48}
          sx={{ placeContent: "center", borderRadius: 100 }}
        >
          <Text
            size={size ? size / 2.3 : 16}
            component="span"
            color="var(--card-text)"
            pt={2}
            weight={700}
            align="center"
          >
            {username && username[0].toUpperCase()}
          </Text>
        </Box>
      )}
    </Avatar>
  );
};

export default ProfileImage;
