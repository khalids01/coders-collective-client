import MainLayout from "@/Layouts/MainLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { createStyles, Stack } from "@mantine/core";
import { Chats, Info } from "@/components/chat/";
import { useChat, useTheme, useUser } from "@/hooks";
import { UserConnectCard } from "@/components/common/sub";
import { User } from "@/types";

const useStyle = createStyles((_, colors:any)=>({
  section: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    rowGap: 20,
    columnGap: 16,
    padding: 25, 
    background: colors.background.neutral,
    height: '100%'
  },
}));

const Chat = () => {
  const {colors} = useTheme()
  const { friends } = useChat();
  const { classes } = useStyle(colors);
console.log(friends)
  return (
    <MainLayout>
      <ChatLayout
        chats={<Chats />}
        rightSection={<Info />}
        content={
          <section className={classes.section}>
            {Object.values(friends)?.length > 0
              ? Object.values(friends)?.map((f, i) => <UserConnectCard user={f} />)
              : null}
          </section>
        }
      />
    </MainLayout>
  );
};

export default Chat;
