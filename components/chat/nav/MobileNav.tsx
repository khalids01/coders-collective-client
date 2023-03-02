import {
  createStyles,
  Text,
  ActionIcon,
  Box,
  Tooltip,
  Stack,
  Divider,
  Switch,
  Avatar,
  useMantineTheme,
  Drawer,
  Group,
  Burger,
  MantineProvider,
  UnstyledButton,
  CloseButton,
} from "@mantine/core";
import Image from "next/image";
import { Fragment, ReactElement, useState } from "react";
import { useBreakPoints } from "@/hooks";
import type { ColorsType } from "@/hooks/useTheme";
import { useUser, useTheme } from "@/hooks";
import { Sun, Moon } from "@/constants/icons";
import { images } from "@/constants";
import Link from "next/link";
import Logo from "@/components/common/sub/Logo";
import { navItems } from "@/constants/layoutItems";

const useStyles = createStyles((theme, { colors }: { colors: ColorsType }) => {
  return {
    header: {
      background: colors.background.default,
      padding: 12,
    },
    drawer: {
      background: colors.background.default,
    },
    body: {
      height: "100%",
    },
    parentStack: {
      backgroundColor: colors.background.paper,
      boxShadow: `0 0 2px ${colors.shadows.paper}`,
      height: "100%",
      width: "100%",
    },
    logo: {
      borderRadius: 12,
    },
    singleItem: {
      transition: "background 0.3s",
      width: "100%",
      alignItems: "center",
      columnGap: 16,
      borderRadius: 8,
      padding: 10,
      height: "auto",
      display: "flex",
      "&:hover": {
        color: "white !important",
        backgroundColor: colors.card.active + " !important",
        "*": {
          color: "white !important",
        },
      },
    },
  };
});

const MobileNav = () => {
  const { colors, toggleColorScheme, colorScheme } = useTheme();
  const { user } = useUser();
  const [activeItem, setActiveItem] = useState(navItems[0].value);
  const mantineTheme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ colors });

  return (
    <nav
      style={{
        backgroundColor: colors.background.neutral,
        borderRight: "none",
        height: "100%",
      }}
    >
      <Group position="apart" p="16px 20px" sx={{ height: "100%" }}>
        <Logo />

        <Burger opened={opened} onClick={() => setOpened(!opened)} />
      </Group>

      <Drawer
        opened={opened}
        withCloseButton={false}
        onClose={() => setOpened(!opened)}
        classNames={{
          // header: classes.header,
          drawer: classes.drawer,
          body: classes.body,
        }}
      >
        <Stack
          justify={"space-between"}
          pt={"1.5rem"}
          px={"1rem"}
          className={classes.parentStack}
        >
          <Stack spacing={24} align={"flex-start"}>
            <Group position="apart" align="flex-start" sx={{ width: "100%" }}>
              <Link href="/" className={classes.logo}>
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
              <CloseButton onClick={() => setOpened(!opened)} />
            </Group>
            {navItems.map(
              (
                item: { value: string; icon: ReactElement; divider: boolean },
                index: number
              ) => (
                <Fragment key={index}>
                  <UnstyledButton
                    onClick={() => setActiveItem(item.value)}
                    className={classes.singleItem}
                    sx={{
                      color:
                        item.value === activeItem
                          ? "white"
                          : colors.text.primary,
                      backgroundColor:
                        (item.value === activeItem
                          ? colors.card.active
                          : "transparent") + " !important",
                    }}
                  >
                    {item.icon}
                    <Text
                      size={16}
                      weight={600}
                      transform="capitalize"
                      color={
                        activeItem === item.value
                          ? "white"
                          : colors.text.primary
                      }
                    >
                      {item.value?.replace("-", " ")}
                    </Text>
                  </UnstyledButton>
                </Fragment>
              )
            )}
          </Stack>

          <Group position="apart" pb={25}>
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
                  backgroundColor: `${colors.background.default} !important`,
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
          </Group>
        </Stack>
      </Drawer>
    </nav>
  );
};

export default MobileNav;
