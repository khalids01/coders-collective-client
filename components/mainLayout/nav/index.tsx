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
  Burger,
} from "@mantine/core";
import Image from "next/image";
import { Fragment, ReactElement, useState } from "react";
import { useBreakPoints, useTheme, useUser } from "@/hooks";
import { Sun, Moon } from "@/constants/icons";
import { images } from "@/constants";
import Link from "next/link";
import { navItems } from "@/constants/layoutItems";
import UserAvatar from "./UserAvatar";
import { Logo } from "@/components/common/sub";
import { ColorsType } from "@/hooks/useTheme";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";

const useStyles = createStyles((theme, { colors }: { colors: ColorsType }) => {
  return {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: 'center',
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

const MobileNav = () => {
  const { colors, colorScheme } = useTheme();
  const [activeItem, setActiveItem] = useState(navItems[0].value);
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles({ colors });
  const router = useRouter()

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
        <Burger opened={opened} onClick={open} />
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={300}
        closeOnEscape
      >
        <Stack>
          {navItems.map(
            (
              item: { value: string; icon: ReactElement; divider: boolean, href: string },
              index: number
            ) => (
              <Fragment key={index}>
                <UnstyledButton
                  onClick={() => {
                    router.push(item.href)
                    setActiveItem(item.value)
                    close()
                  }}
                  className={classes.singleItem}
                  sx={{
                    color:
                      item.value === activeItem ? "white" : colors.text.primary,
                    backgroundColor:
                      (item.value === activeItem
                        ? colors.card.focus
                        : "transparent") + " !important",
                  }}
                >
                  {item.icon}
                  <Text
                    size={16}
                    weight={600}
                    transform="capitalize"
                    color={
                      activeItem === item.value ? "white" : colors.text.primary
                    }
                  >
                    {item.value?.replace("-", " ")}
                  </Text>
                </UnstyledButton>
              </Fragment>
            )
          )}
        </Stack>
      </Drawer>
    </header>
  );
};

const DesktopNav = () => {
  const { colors, toggleColorScheme, colorScheme } = useTheme();
  const [activeItem, setActiveItem] = useState(navItems[0].value);
  const mantineTheme = useMantineTheme();

  return (
    <nav
      className="nav main-nav desktop-nav"
      style={{
        backgroundColor: "transparent",
        borderRight: "none",
        height: "100%",
      }}
    >
      <Stack
        justify={"space-between"}
        pt={16}
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
              <ActionIcon
                key={index}
                size={30}
                radius={12}
                onClick={() => setActiveItem(item.value)}
                // @ts-ignore
                sx={{
                  color:
                    item.value === activeItem ? "white" : colors.text.primary,
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
          <UserAvatar />
        </Stack>
      </Stack>
    </nav>
  );
};

const CustomNavbar = () => {
  const { md } = useBreakPoints();
  console.log({ md });

  return <>{md ? <MobileNav /> : <DesktopNav />}</>;
};

export default CustomNavbar;
