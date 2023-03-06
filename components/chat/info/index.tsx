import { showChatInfo } from "@/redux/slices/chatLayoutProps";
import {useLayout} from '@/hooks'
import { Text, Group, Stack, Grid } from "@mantine/core";
import { useMessage } from "@/hooks";
import Image from "next/image";

const ChatInfo = () => {
  const { sendingTo } = useMessage();

  return (
    <Stack px={20} py={30} spacing={0}>
      <Grid>
        <Grid.Col>
          <Image
            src={sendingTo.avatar}
            alt={sendingTo.name}
            width={60}
            height={60}
            className="circle"
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
export default ChatInfo;
