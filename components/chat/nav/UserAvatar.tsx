import { Avatar, Box, Menu, UnstyledButton, Text } from "@mantine/core";
import { useUser, useTheme, useAuth } from "@/hooks";
import Image from "next/image";
import { User, Logout } from "@/constants/icons";
import { CompactText } from "@/components/common/sub";

const UserAvatar = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const { logout } = useAuth();

  return (
    <Menu
      width={150}
      position="right-end"
      styles={{
        dropdown: { backgroundColor: colors.background.paper },
        item: { fontSize: 16 },
        divider: {
          borderColor: colors.divider,
        },
      }}
    >
      <Menu.Target>
        <UnstyledButton>
          <Avatar radius={50}>
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user?.first_name as string}
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
                  {user?.first_name[0].toUpperCase()}
                  {user?.last_name[0].toUpperCase()}
                </Text>
              </Box>
            )}
          </Avatar>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<User size={18} />}>Account</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<Logout size={18} />} onClick={() => logout()}>
          Logout
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>
          <Text size={12} color={colors.text.secondary}>
            Name
          </Text>
          <CompactText
            size={14}
            text={`${user?.first_name} ${user?.last_name}`}
            length={14}
          />
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserAvatar;
