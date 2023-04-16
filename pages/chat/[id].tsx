import MainLayout from "@/Layouts/MainLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { Stack } from "@mantine/core";
import {
  ChatHeader,
  Chats,
  Dialogues,
  MessageForm,
  Info,
} from "@/components/chat/";
import { withRouter, NextRouter } from "next/router";
import { useBreakPoints, useMessage } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

const Chat = ({ router }: { router: NextRouter }) => {
  const { md } = useBreakPoints();
  const { setConverSationId } = useMessage();

  useEffect(() => {
    if(!String(router.query?.id).trim()) return ;
    setConverSationId(router.query.id as string);
  }, [router.query?.id]);

  const { height } = useSelector(
    (state: RootState) => state.chatLayout.conversation.form
  );

  return (
    <MainLayout showMainNav={!md}>
      <ChatLayout
        chats={<Chats />}
        showChats={!md}
        content={
          <Stack
            className="content"
            align="stretch"
            justify="space-between"
            sx={{
              height: "100%",
              maxHeight: "100svh",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "100%",
              gridTemplateRows: `70px 1fr minmax(80px, ${height}px)`,
            }}
            spacing={0}
          >
            <ChatHeader receiverId={router.query?.id as string} />
            <Dialogues receiverId={router.query?.id as string} />
            <MessageForm receiverId={router.query?.id as string} />
          </Stack>
        }
      />
    </MainLayout>
  );
};

export default withRouter(Chat);
