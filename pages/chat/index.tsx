import ChatLayout from "@/Layouts/ChatLayout";
import { Stack } from "@mantine/core";
import { useBreakPoints } from "@/hooks";
import { ChatHeader, Dialogues, MessageForm } from "@/components/chat/";

const Chat = () => {
  const { md } = useBreakPoints();

  return (
    <ChatLayout>
      <Stack
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
    </ChatLayout>
  );
};

export default Chat;
