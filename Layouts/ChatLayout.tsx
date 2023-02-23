import { createStyles, useMantineTheme } from "@mantine/core";

import ChatNavbar from "@/components/chat/Nav";
import ChatsSection from "@/components/chat/Chats";

const useStyle = createStyles(() => {
  const mantineTheme = useMantineTheme();

  return {
    layout: {
      display: "grid",
      gridTemplateColumns: `80px 350px auto`,
      gridTemplateRows: "100%",
      height: "100%",
      [`@media (max-width: ${mantineTheme.breakpoints.md}px)`]: {
        gridTemplateColumns: `100%`,
        gridTemplateRows: `70px auto 80px`,
      },
    },
  };
});

const ChatLayout = ({ children }: { children: any }) => {
  const { classes } = useStyle();
  return (
    <div className={classes.layout}>
      <ChatNavbar />
      <ChatsSection />
      {children}
    </div>
  );
};

export default ChatLayout;
