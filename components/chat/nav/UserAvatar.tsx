import { Avatar, Menu, UnstyledButton } from "@mantine/core";
import { useUser, useTheme } from "@/hooks";
import Image from "next/image";
import { User, Logout } from "@/constants/icons";

const UserAvatar = () => {
  const { colors } = useTheme();
  const { user } = useUser();

  return (
    <Menu
      width={150}
      position="right-end"
      styles={{ dropdown: { backgroundColor: colors.background.paper }, item:{fontSize: 16} }}
    >
      <Menu.Target>
        <UnstyledButton>
          <Avatar radius={50}>
            {user?.userName ? (
              <Image
                src={user.avatar}
                alt={user?.userName as string}
                height={48}
                width={48}
                className="cover"
              />
            ) : null}
          </Avatar>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<User size={18} />}>Account</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<Logout size={18} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserAvatar;
