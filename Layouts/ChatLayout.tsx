import { AppShell, createStyles } from "@mantine/core";
import type { ReactNode } from "react";
import { useBreakPoints } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ChatLayoutProps {
  chats: ReactNode;
  content: ReactNode;
  rightSection: ReactNode;
}

const useStyles = createStyles((theme) => ({
  container: {
    height: "100%",
    width: "calc(100%-80px)",
    alignItems: "stretch",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "350px auto",
    gridTemplateRows: "100%",
  },
  withInfo: {
    [theme.fn.largerThan("md")]: {
      gridTemplateColumns: `350px auto 350px`,
    },
  },
  chats: {
    width: 350,
  },
  content: {
    width: "auto",
  },
  rightSection: {
    width: 1,
  },
}));

const ChatLayout = ({ chats, content, rightSection }: ChatLayoutProps) => {
  const { classes } = useStyles();
  const { showInfo } = useSelector(
    (state: RootState) => state.chatLayout.chatInfo
  );

  return (
    <section
      className={`${classes.container} ${showInfo ? classes.withInfo : ""}`}
    >
      <div className={classes.chats}>{chats}</div>
      <div className={classes.content}>{content}</div>
      {showInfo && rightSection}
    </section>
  );
};

export default ChatLayout;
