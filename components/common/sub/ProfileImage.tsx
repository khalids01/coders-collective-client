import Image from "next/image";
import { Avatar, Box, Text } from "@mantine/core";

interface Props {
  first_name: string;
  last_name?: string;
  avatar: string;
  size?: number;
}

const ProfileImage = ({ first_name, last_name, avatar, size }: Props) => {
  
  return (
    <Avatar radius={50}>
      {avatar?.length > 0 ? (
        <Image
          src={avatar}
          alt={first_name as string}
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
          <Text component="span" color="var(--card-text)" pt={2}>
            {first_name && first_name[0].toUpperCase()}
            {last_name && last_name[0].toUpperCase()}
          </Text>
        </Box>
      )}
    </Avatar>
  );
};

export default ProfileImage;
