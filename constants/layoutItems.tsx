import { Settings, User, Users, Message, Code, Bell, Dashboard } from "@/constants/icons";
import endpoints from "./endpoints";

export const navItems = [
  {
    value: 'dashboard',
    icon: <Dashboard size={24}/>,
    divider: false,
    href: endpoints.client.dashboard
  },
  {
    value: "chat",
    icon: <Message size={24} />,
    divider: false,
    href: endpoints.client.chat
  },
  // {
  //   value: "teams",
  //   icon: <Users size={24} />,
  //   divider: false,
  // },
  // {
  //   value: 'my-task',
  //   icon: <Bookmark size={24} />,
  //   divider: false
  // },
  {
    value: "code",
    icon: <Code size={24} />,
    divider: false,
    href: endpoints.client.dashboard
  },
  {
    value: "notification",
    icon: <Bell size={24} />,
    divider: false,
    href: endpoints.client.dashboard
  },
  {
    value: "settings",
    icon: <Settings size={24} />,
    divider: true,
    href: endpoints.client.dashboard
  },
];
