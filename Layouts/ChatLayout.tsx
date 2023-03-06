import {
  createStyles,
  useMantineTheme,
  AppShell,
  Header,
  Footer,
} from "@mantine/core";

import ChatNavbar from "@/components/chat/nav";
import ChatsSection from "@/components/chat/Chats";
import MessageForm from "@/components/chat/MessageForm";
import { useBreakPoints, useLayout } from "@/hooks";
import ChatInfo from "@/components/chat/info";

const useStyle = createStyles(() => {
  return {
    layout: {
      display: "grid",
      gridTemplateColumns: `80px 350px auto`,
      gridTemplateRows: "100%",
      height: "100%",
    },
    withInfo: {
      gridTemplateColumns: `80px 350px auto 280px`,
    },
  };
});

const ChatLayout = ({ children }: { children: any }) => {
  const { classes } = useStyle();
  const { md } = useBreakPoints();
  const { showChatInfo } = useLayout();

  if (md) {
    return (
      <AppShell
        fixed
        header={
          <Header height={80} fixed>
            <ChatNavbar />
          </Header>
        }
        footer={
          <Footer height={100} fixed>
            <MessageForm />
          </Footer>
        }
        styles={{
          main: {
            paddingInline: 0,
            background: "var(--bg-default)",
          },
        }}
      >
        <ChatsSection />
      </AppShell>
    );
  }

  return (
    <div
      className={`${classes.layout} ${showChatInfo ? classes.withInfo : ""}`}
    >
      <ChatNavbar />
      <ChatsSection />
      {children}
      {showChatInfo ? <ChatInfo /> : null}
    </div>
  );
};

export default ChatLayout;
