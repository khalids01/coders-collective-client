import { rem, createStyles, NavLink, Navbar, Group, ScrollArea } from "@mantine/core";
import {
  CircleDashed,
  Message,
  Bell,
  Settings,
  Code,
  SmileEmoji,
} from "@/constants/icons";
import { Logo, ProfileImage } from "@/components/common/sub";
import { useUser } from "@/hooks";
import { ReactElement } from "react";
import Link from "next/link";
import { endpoints } from "@/constants";

const dashboardData = [
  { label: "Dashboard", icon: CircleDashed, link: endpoints.client.dashboard },
  { label: "Code", icon: Code, link: endpoints.client.dashboard },
  { label: "Chat", icon: Message, link: endpoints.client.chat },
  { label: "Notification", icon: Bell, link: endpoints.client.dashboard },
  { label: "Memes", icon: SmileEmoji, link: endpoints.client.dashboard },
  { label: "Settings", icon: Settings, link: endpoints.client.dashboard },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const LinkGroup = ({
  label,
  icon,
  link,
}: {
  link: string;
  label: string;
  icon: any;
}) => {
  return <NavLink label={label} component={Link} icon={icon} href={link} />;
};

function CustomNavbar() {
  const { classes } = useStyles();
  const links = dashboardData.map((item) => (
    <LinkGroup link={item.link} icon={item.icon} label={item.label} key={item.label} />
  ));
  const { user } = useUser();

  return (
    <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Logo />
          <Code>v3.1.2</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <ProfileImage
          avatar={user?.avatar as string}
          first_name={user?.first_name as string}
          last_name={user?.first_name}
        />
      </Navbar.Section>
    </Navbar>
  );
}

export default CustomNavbar