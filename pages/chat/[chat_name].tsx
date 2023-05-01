import MainLayout from "@/Layouts/MainLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { Stack } from "@mantine/core";
import { ChatHeader, Chats, Dialogues, MessageForm } from "@/components/chat/";
import { withRouter, NextRouter, useRouter } from "next/router";
import { useBreakPoints, useMessage, useUser } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSockets } from "@/context/socket.context";
import { EVENTS } from "@/constants/socketConfig";
import { Message } from "@/types";
import { hideNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { addANewMessage } from "@/redux/slices/conversationSlice";
import { ArrayStatesType } from "@/hooks/useArray";
import { endpoints } from "@/constants";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { GetServerSidePropsContext } from "next";

const Chat = ({router}:{router: NextRouter}) => {
  const { md } = useBreakPoints();
  const { setConverSationId } = useMessage();
  const { socket, newMessagesArray } = useSockets();
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    if (!String(router.query?.chat_name).trim()) return;
    if (router.query?.chat_name === user?.username) {
      router.push(endpoints.client.chat);
      return;
    }
    setConverSationId(router.query.chat_name as string);
    hideNotification(router.query?.chat_name as string);
    if (!socket || !newMessagesArray) return;

    const { push } = newMessagesArray as ArrayStatesType;

    socket.off(EVENTS.CLIENT.GET_CONVERSATION_NEW_MESSAGE);
    socket.on(EVENTS.CLIENT.GET_CONVERSATION_NEW_MESSAGE, (data: Message) => {
      push(data);
      if (
        !!String(router.query?.chat_name).trim() &&
        router.query?.chat_name === data.sender.username
      ) {
        dispatch(addANewMessage(data));
      }
    });
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return requireAuthentication(context);
}
