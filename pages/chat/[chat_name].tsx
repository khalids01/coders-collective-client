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
    if(!String(router.query?.chat_name).trim()) return ;
    setConverSationId(router.query.chat_name as string);
  }, [router.query?.chat_name]);

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
            <ChatHeader chat_name={router.query?.chat_name as string} />
            <Dialogues chat_name={router.query?.chat_name as string} />
            <MessageForm chat_name={router.query?.chat_name as string} />
          </Stack>
        }
      />
    </MainLayout>
  );
};

export default withRouter(Chat);
