import {
  Menu,
  UnstyledButton,
  Text,
  MantineStyleSystemProps,
} from "@mantine/core";
import { useUser, useTheme, useAuth } from "@/hooks";
import { User, Logout } from "@/constants/icons";
import { CompactText, ProfileImage } from "@/components/common/sub";
import { FloatingPosition } from "@mantine/core/lib/Floating/types";

const UserAvatar = ({
  position = "right-end",
}: {
  position?: FloatingPosition;
}) => {
  const { colors } = useTheme();
  const { user } = useUser();
  const { logout } = useAuth();

  return (
    <Menu
      width={150}
      position={position}
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
          {user?._id ? (
            <ProfileImage size={40} username={user.username} avatar={user.avatar} />
          ) : null}
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<User size={18} />}>Profile</Menu.Item>
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
