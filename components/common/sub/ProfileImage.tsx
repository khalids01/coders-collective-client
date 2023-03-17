import Image from "next/image";
import { Avatar, Box, Text } from "@mantine/core";

const ProfileImage = ({first_name, last_name, avatar}:{first_name: string, last_name: string, avatar: string}) => {
    return (
        <Avatar radius={50}>
        {avatar.length > 0 ? (
          <Image
            src={avatar}
            alt={first_name as string}
            height={48}
            width={48}
            className="cover"
          />
        ) : (
          <Box
            bg="var(--card-focus)"
            display={"grid"}
            p={10}
            sx={{ placeContent: "center", borderRadius: 100 }}
          >
            <Text component="span" color="var(--card-text)" pt={2}>
              {first_name[0].toUpperCase()}
              {last_name[0].toUpperCase()}
            </Text>
          </Box>
        )}
      </Avatar>
    )
}

export default ProfileImage