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
import { useBreakPoints } from "@/hooks";
import { useSelector } from "react-redux";
import ChatInfo from "@/components/chat/info";
import type { RootState } from "@/redux/store";

const useStyle = createStyles(() => {
  return {
    layout: {
      display: "grid",
      gridTemplateColumns: `80px 350px auto`,
      gridTemplateRows: "100%",
      height: "100%",
    },
    withInfo: {
      gridTemplateColumns: `80px 350px auto 350px`,
    },
  };
});

const ChatLayout = ({ children }: { children: any }) => {
  const { classes } = useStyle();
  const { md } = useBreakPoints();
  const { showInfo } = useSelector(
    (state: RootState) => state.chatLayout.chatInfo
  );

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
    <div className={`${classes.layout} ${showInfo ? classes.withInfo : ""}`}>
      <ChatNavbar />
      <ChatsSection />
      {children}
      {showInfo ? <ChatInfo /> : null}
    </div>
  );
};

export default ChatLayout;
