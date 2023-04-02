import { createStyles } from "@mantine/core";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { withRouter, NextRouter } from "next/router";
import { useBreakPoints } from "@/hooks";

interface ChatLayoutProps {
  chats: ReactNode;
  content: ReactNode | null;
  rightSection: ReactNode;
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
  rightSection,
  showContent = true,
  showChats = true,
}: ChatLayoutProps) => {
  const { md } = useBreakPoints();
  const { classes } = useStyles();
  const { showInfo } = useSelector(
    (state: RootState) => state.chatLayout.chatInfo
  );

  return (
    <section
      className={`${classes.container} ${showInfo ? classes.withInfo : ""}`}
    >
      {showChats ? <div className={classes.chats}>{chats}</div> : null}
      {showContent ? content : null}
      {showInfo && rightSection}
    </section>
  );
};

export default ChatLayout;
