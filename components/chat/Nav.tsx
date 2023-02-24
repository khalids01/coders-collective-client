import {
  Navbar,
  Text,
  ActionIcon,
  Box,
  Tooltip,
  Stack,
  Divider,
  Switch,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import { ReactElement, useState } from "react";
import { useBreakPoints } from "@/hooks";
import moment from "moment";
import { useUser, useTheme } from "@/hooks";
import {
  Settings,
  User,
  Users,
  Message,
  Code,
  Sun,
  Moon,
} from "@/constants/icons";
import { images } from "@/constants";
import Link from "next/link";

const navItems = [
  {
    value: "chats",
    icon: <Message size={22} />,
    divider: false,
  },
  {
    value: "teams",
    icon: <Users size={22} />,
    divider: false,
  },
  // {
  //   value: 'my-task',
  //   icon: <Bookmark size={22} />,
  //   divider: false
  // },
  {
    value: "code",
    icon: <Code size={22} />,
    divider: false,
  },
  // {
  //   value: 'notification',
  //   icon: <Bell size={22} />,
  //   divider: false
  // },
  {
    value: "settings",
    icon: <Settings size={22} />,
    divider: true,
  },
];

const subs = [
  {
    value: "User 11",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "user",
  },
  {
    value: "Group 1",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "group",
    channels: [],
  },
  {
    value: "User 2",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "user",
  },
  {
    value: "User 1",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "user",
  },
  {
    value: "Group 1",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "group",
    channels: [],
  },
  {
    value: "User 2",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "user",
  },
  {
    value: "User 1",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "user",
  },
  {
    value: "Group 1",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "group",
    channels: [],
  },
  {
    value: "User 2",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "user",
  },
  {
    value: "User 1",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "user",
  },
  {
    value: "Group 1",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "group",
    channels: [],
  },
  {
    value: "User 2",
    image: "/assets/images/logo.svg",
    description: "this is description",
    type: "user",
  },
];

const CustomNavbar = () => {
  const { colors, toggleColorScheme, colorScheme } = useTheme();
  const { lg } = useBreakPoints();
  const { user } = useUser();
  const [activeItem, setActiveItem] = useState(navItems[0].value);
  const mantineTheme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <nav
      style={{
        backgroundColor: "transparent",
        borderRight: "none",
        height: "100%",
      }}
    >
      <Stack
        justify={"space-between"}
        pt={20}
        sx={{
          backgroundColor: colors.background.paper,
          boxShadow: `0 0 2px ${colors.shadows.paper}`,
          height: "100%",
          width: 80,
        }}
      >
        <Stack spacing={24} px={".8rem"} align={"center"}>
          <Stack mb={10}>
            <Box
              sx={{
                height: 64,
                width: 64,
                borderRadius: 12,
                display: "grid",
                placeContent: "center",
              }}
            >
              <Link href="/">
                <Image
                  src={
                    colorScheme === "light"
                      ? images.logoBlack
                      : images.logoWhite
                  }
                  alt={process.env.NEXT_PUBLIC_NAME || "Coders collective"}
                  height={40}
                  width={40}
                  className="contain"
                />
              </Link>
            </Box>
          </Stack>
          {navItems.map(
            (
              item: { value: string; icon: ReactElement; divider: boolean },
              index: number
            ) => (
              <Box key={index}>
                {item.divider ? (
                  <Divider w={48} size={2} color={colors.divider} mb={24} />
                ) : null}
                <Tooltip
                  position="right"
                  // withArrow
                  sx={{
                    background: colors.card.active,
                  }}
                  label={
                    <Text size={14} transform="capitalize" color={"white"}>
                      {item.value?.replace("-", " ")}
                    </Text>
                  }
                >
                  <ActionIcon
                    size={30}
                    radius={12}
                    // onClick={() => setActiveItem(item.value)}
                    // @ts-ignore
                    sx={{
                      color:
                        item.value === activeItem
                          ? "white"
                          : colors.text.primary,
                      backgroundColor:
                        (item.value === activeItem
                          ? colors.card.active
                          : "transparent") + " !important",
                      transition: "background 0.3s",
                      aspectRatio: "1/1",
                      width: "max-content",
                      padding: 10,
                      height: "auto",
                      "&:hover": {
                        color: "white",
                        backgroundColor: colors.card.active + " !important",
                      },
                    }}
                  >
                    {item.icon}
                  </ActionIcon>
                </Tooltip>
              </Box>
            )
          )}
        </Stack>

        <Stack justify="center" align={"center"} spacing={24} pb={25}>
          <Switch
            checked={colorScheme === "light"}
            onChange={() => toggleColorScheme()}
            size="lg"
            onLabel={
              <Sun
                color={mantineTheme.colors.orange[4]}
                size={20}
                stroke={2.5}
              />
            }
            offLabel={
              <Moon
                color={mantineTheme.colors.blue[4]}
                size={20}
                stroke={2.5}
              />
            }
            sx={{
              label: {
                backgroundColor: `${colors.background.lighter} !important`,
                borderColor: colors.background.lighter + " !important",
              },
            }}
            // styles={{
            //   thumb: {
            //     backgroundColor: `${colors.card.focus} !important`,
            //     borderColor: colors.card.focus + " !important",
            //   },
            // }}
          />
          <Avatar radius={50}>
            {user?.userName ? (
              <Image
                src={images.k}
                alt={user?.userName as string}
                height={48}
                width={48}
                className="cover"
              />
            ) : null}
          </Avatar>
        </Stack>
      </Stack>
    </nav>
  );
};

export default CustomNavbar;
