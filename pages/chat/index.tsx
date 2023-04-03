import MainLayout from "@/Layouts/MainLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { createStyles } from "@mantine/core";
import { Chats, Info } from "@/components/chat/";
import { useBreakPoints, useChat, useTheme } from "@/hooks";
import { UserConnectCard } from "@/components/common/sub";
import { NextRouter, withRouter } from "next/router";

const useStyle = createStyles((_, colors: any) => ({
  section: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    rowGap: 20,
    columnGap: 16,
    padding: 25,
    background: colors.background.neutral,
    height: "100%",
  },
}));

const Chat = ({ router }: { router: NextRouter }) => {
  const { colors } = useTheme();
  const { friends } = useChat();
  const { classes } = useStyle(colors);
  const { md } = useBreakPoints();

  return (
    <MainLayout showMainNav={!md}>
      <ChatLayout
        showContent={!md && !router.query?.id}
        chats={<Chats />}
        content={
          md ? null : (
            <section className={classes.section}>
              {Object.values(friends)?.length > 0
                ? Object.values(friends)?.map((f, i) => (
                    <UserConnectCard user={f} />
                  ))
                : null}
            </section>
          )
        }
      />
    </MainLayout>
  );
};

export default withRouter(Chat);
