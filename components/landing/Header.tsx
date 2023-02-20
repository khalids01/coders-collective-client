import {
  Text,
  Button,
  Box,
  Group,
  Drawer,
  Stack,
  Container,
  Burger,
} from "@mantine/core";
import Image from "next/image";
import { useToken, useTheme, useBreakPoints } from "@/hooks";
import Link from "next/link";
import { endpoints } from "@/constants";
import { useState } from "react";
import { Logo } from "../common/sub";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Playground",
    href: "/playground",
  },
  {
    label: "Explore",
    href: "/explore",
  },
];

const NavLinks = () => {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState("");

  return (
    <>
      {links.map((item, index) => (
        <Text
          href={item.href}
          key={index}
          component={Link}
          color={colors.landingPage.text.header}
          size={16}
          weight={600}
          onMouseOver={() => setHovered(item.href)}
          onMouseOut={() => setHovered("")}
          sx={{
            transition: "all 0.3s",
            filter: `${
              hovered && hovered !== item.href ? "blur(4px)" : "unset"
            }`,
            "&:hover": {
              color: "var(--teal)",
              textShadow: "0 0 2px var(--teal)",
            },
          }}
        >
          {item.label}
        </Text>
      ))}
    </>
  );
};

const CallToAction = () => {
  const { colors } = useTheme();
  const { isLoggedIn } = useToken();

  return (
    <Text
      component={Link}
      href={isLoggedIn ? endpoints.client.dashboard : endpoints.client.login}
      weight={600}
      sx={{
        border: `2px solid ${colors.landingPage.text.header}`,
        color: colors.landingPage.text.header,
        transition: "all 0.3s",
        borderRadius: 6,
        padding: "7px 25px",
        "&:hover": {
          borderColor: "var(--teal)",
          color: "var(--teal)",
        },
      }}
    >
      {isLoggedIn ? "Dashboard" : "Login"}
    </Text>
  );
};

const DesktopNav = () => {
  const { lg } = useBreakPoints();

  return (
    <nav>
      <Group position="apart">
        <Logo />
        <Group spacing={lg ? 40 : 80}>
          <NavLinks />
          <CallToAction />
        </Group>
      </Group>
    </nav>
  );
};

const MobileNav = () => {
  const { colors } = useTheme();
  const [opened, setOpened] = useState(false);

  return (
    <nav>
      <Group position="apart">
        <Logo />

        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          color="var(--teal)"
        />

        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title={
            <Group>
              <Logo size={25} />
              {process.env.NEXT_PUBLIC_NAME}
            </Group>
          }
          styles={{
            title: {
              marginLeft: 30,
              marginTop: 20,
              color: colors.landingPage.text.header,
            },
            drawer: {
              background: colors.landingPage.background.header,
            },
            closeButton: {
              right: 10,
              top: 10,
            },
          }}
        >
          <Stack spacing={30} px={30} pt={30}>
            <NavLinks />
            <CallToAction />
          </Stack>
        </Drawer>
      </Group>
    </nav>
  );
};

const Header = () => {
  const { md } = useBreakPoints();

  return (
    <header>
      <Container py={20} px={20} size="xl">
        {md ? <MobileNav /> : <DesktopNav />}
      </Container>
    </header>
  );
};

export default Header;
