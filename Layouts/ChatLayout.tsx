import { createStyles } from "@mantine/core";
import type { ReactNode } from "react";
import { Chats } from "@/components/chat";
interface ChatLayoutProps {
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
  content,
  showContent = true,
  showChats = true,
}: ChatLayoutProps) => {
  const { classes } = useStyles();

  return (
    <section className={`${classes.container}`}>
      {showChats ? (
        <div className={classes.chats}>
          <Chats />
        </div>
      ) : null}
      {showContent ? content : null}
    </section>
  );
};

export default ChatLayout;
