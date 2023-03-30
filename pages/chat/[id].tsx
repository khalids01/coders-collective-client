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

const Chat = () => {
  return (
    <MainLayout>
      <ChatLayout
        chats={<Chats />}
        rightSection={<Info />}
        content={
          <Stack
            className="content"
            align="stretch"
            justify="space-between"
            sx={{
              maxHeight: "100svh",
              overflow: "hidden",
            }}
            spacing={0}
          >
            <ChatHeader />
            <Dialogues />
            <MessageForm />
          </Stack>
        }
      />
    </MainLayout>
  );
};

export default Chat;
