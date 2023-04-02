import {
  createStyles,
  Text,
  ActionIcon,
  Box,
  Tooltip,
  Stack,
  Divider,
  Switch,
  useMantineTheme,
  CloseButton,
  Group,
  UnstyledButton,
  Drawer,
  NavLink,
  Burger,
  ScrollArea,
} from "@mantine/core";
import Image from "next/image";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { useBreakPoints, useTheme, useUser } from "@/hooks";
import { Sun, Moon } from "@/constants/icons";
import { images } from "@/constants";
import Link from "next/link";
import { navItems } from "@/constants/layoutItems";
import UserAvatar from "./UserAvatar";
import { Logo, ToggleTheme } from "@/components/common/sub";
import { ColorsType } from "@/hooks/useTheme";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { showMainNavDrawer } from "@/redux/slices/chatLayoutProps";

const useStyles = createStyles((theme, { colors }: { colors: ColorsType }) => {
  return {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 16px",
    },
    nav: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      alignItems: "center",
      columnGap: 20,
    },

    singleItem: {
      transition: "background 0.3s",
      display: "flex",
      justifyContent: "flex-start",
      columnGap: 10,
      alignItems: "center",
      borderRadius: 8,
      padding: 10,
      width: "100%",
      "&:hover": {
        color: "white !important",
        backgroundColor: colors.card.focus + " !important",
        "*": {
          color: "white !important",
        },
      },
    },
  };
});

export const MobileNavbarDrawer = () => {
  const { colors } = useTheme();
  const { classes } = useStyles({ colors });
  const router = useRouter();
  const { show } = useSelector(
    (state: RootState) => state.chatLayout.mainNavDrawer
  );
  const dispatch = useDispatch();

  return (
    <Drawer
      opened={show}
      onClose={() => dispatch(showMainNavDrawer(false))}
      withCloseButton={false}
      size={300}
      closeOnEscape
      styles={{
        content: {
          background: colors.background.paper,
        },
      }}
    >
      <Stack h="100vh" justify={"space-between"} pt={5} pb={40}>
        <Stack>
          {navItems.map(
            (
              item: {
                value: string;
                icon: ReactElement;
                divider: boolean;
                href: string;
              },
              index: number
            ) => {
              const active = router.asPath === item.href;
              return (
                <Fragment key={index}>
                  <UnstyledButton
                    onClick={() => {
                      router.push(item.href);
                      dispatch(showMainNavDrawer(false));
                    }}
                    className={classes.singleItem}
                    sx={{
                      color: active ? "white" : colors.text.primary,
                      backgroundColor:
                        (active ? colors.card.focus : "transparent") +
                        " !important",
                    }}
                  >
                    {item.icon}
                    <Text
                      size={16}
                      weight={600}
                      transform="capitalize"
                      color={active ? "white" : colors.text.primary}
                    >
                      {item.value?.replace("-", " ")}
                    </Text>
                  </UnstyledButton>
                </Fragment>
              );
            }
          )}
        </Stack>

        <Group align={"center"} position="apart" spacing={24} px={5}>
          <UserAvatar position="bottom-start" />
          <ToggleTheme />
        </Group>
      </Stack>
    </Drawer>
  );
};

const MobileNav = () => {
  const { colors } = useTheme();
  const { classes } = useStyles({ colors });
  const { show } = useSelector(
    (state: RootState) => state.chatLayout.mainNavDrawer
  );
  const dispatch = useDispatch();

  return (
    <header
      className={`nav main-nav mobile-nav ${classes.header}`}
      style={{
        backgroundColor: colors.background.neutral,
        borderRight: "none",
        height: "100%",
      }}
    >
      <Logo size={30} />
      <Burger opened={show} onClick={() => dispatch(showMainNavDrawer(true))} />
      <MobileNavbarDrawer />
    </header>
  );
};

const DesktopNav = () => {
  const { colors, colorScheme } = useTheme();
  const { route } = useSelector((state: RootState) => state.activeRoute);
  const router = useRouter();
  return (
    <nav
      className="nav main-nav desktop-nav"
      style={{
        backgroundColor: "transparent",
        borderRight: "none",
        height: "100%",
      }}
    >
      {/* <ScrollArea h="100%"> */}
      <Stack
        justify={"space-between"}
        pt={16}
        h={"100svh"}
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
              item: {
                value: string;
                icon: ReactElement;
                divider: boolean;
                href: string;
              },
              index: number
            ) => {
              // const active = route.includes(item.href)
              const active = item.href === route;
              return (
                <Box key={index}>
                  {item.divider ? (
                    <Divider w={48} size={2} color={colors.divider} mb={24} />
                  ) : null}
                  <Tooltip
                    position="right"
                    // withArrow
                    sx={{
                      background: colors.card.focus,
                    }}
                    label={
                      <Text size={14} transform="capitalize" color={"white"}>
                        {item.value?.replace("-", " ")}
                      </Text>
                    }
                  >
                    <ActionIcon
                      key={index}
                      size={30}
                      radius={12}
                      onClick={() => {
                        router.push(item.href);
                      }}
                      sx={{
                        color: active ? "white" : colors.text.primary,
                        backgroundColor:
                          (active ? colors.card.focus : "transparent") +
                          " !important",
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
              );
            }
          )}
        </Stack>

        <Stack justify="center" align={"center"} spacing={24} pb={25}>
          <ToggleTheme />
          <UserAvatar />
        </Stack>
      </Stack>
      {/* </ScrollArea> */}
    </nav>
  );
};

const CustomNavbar = () => {
  const { md } = useBreakPoints();

  return <>{md ? <MobileNav /> : <DesktopNav />}</>;
};

export default CustomNavbar;
