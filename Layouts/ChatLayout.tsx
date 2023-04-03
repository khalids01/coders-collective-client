import { createStyles } from "@mantine/core";
import type { ReactNode } from "react";

interface ChatLayoutProps {
  chats: ReactNode;
  content: ReactNode | null;
  showContent?: Boolean;
  showChats?: Boolean;
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
    [theme.fn.smallerThan("md")]: {
      display: "block",
    },
  },
  withInfo: {
    [theme.fn.largerThan("md")]: {
      gridTemplateColumns: `350px auto 350px`,
    },
  },
  chats: {
    width: 350,
    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },

  rightSection: {
    width: 1,
  },
}));

const ChatLayout = ({
  chats,
  content,
  showContent = true,
  showChats = true,
}: ChatLayoutProps) => {
  const { classes } = useStyles();

  return (
    <section
      className={`${classes.container}`}
    >
      {showChats ? <div className={classes.chats}>{chats}</div> : null}
      {showContent ? content : null}
    </section>
  );
};

export default ChatLayout;
