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
import { useBreakPoints } from "@/hooks";

const Chat = ({ router }: { router: NextRouter }) => {
  const {md} = useBreakPoints()
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
              height: '100%',
              maxHeight: "100svh",
              overflow: "hidden",
              display: 'grid',
              gridTemplateColumns: '100%',
              gridTemplateRows: `70px 1fr 80px`
            }}
            spacing={0}
          >
            <ChatHeader receiverId={router.query?.id as string}/>
            <Dialogues receiverId={router.query?.id as string}/>
            <MessageForm receiverId={router.query?.id as string}/>
          </Stack>
        }
      />
    </MainLayout>
  );
};

export default withRouter(Chat);
