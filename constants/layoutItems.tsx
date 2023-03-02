import { Settings, User, Users, Message, Code, Bell } from "@/constants/icons";

export const navItems = [
  {
    value: "chats",
    icon: <Message size={24} />,
    divider: false,
  },
  {
    value: "teams",
    icon: <Users size={24} />,
    divider: false,
  },
  // {
  //   value: 'my-task',
  //   icon: <Bookmark size={24} />,
  //   divider: false
  // },
  {
    value: "code",
    icon: <Code size={24} />,
    divider: false,
  },
  {
    value: "notification",
    icon: <Bell size={24} />,
    divider: false,
  },
  {
    value: "settings",
    icon: <Settings size={24} />,
    divider: true,
  },
];
