import { useState, useEffect } from "react";

interface CommonProps {
  height: string | number;
  width: string | number;
  mode: "mobile" | "desktop";
}

interface Conversation {
  header: CommonProps;
  dialogues: CommonProps;
  form: {
    height: number;
    width: string | number;
    mode: "mobile" | "desktop";
  };
}

interface ChatLayout {
  nav: CommonProps;
  chats: CommonProps;
  conversation: Conversation;
}

const useLayout = () => {
  const [chatLayout, setChatLayout] = useState<ChatLayout>({
    nav: {
      height: "100%",
      width: 80,
      mode: "desktop",
    },
    chats: {
      height: "100%",
      width: 350,
      mode: "desktop",
    },
    conversation: {
      header: {
        height: "auto",
        width: "auto",
        mode: "desktop",
      },
      dialogues: {
        height: "100%",
        width: "auto",
        mode: "desktop",
      },
      form: {
        height: 80,
        width: "auto",
        mode: "desktop",
      },
    },
  });

  const [showChatInfo, setShowChatInfo] = useState(true);

  useEffect(() => {}, []);

  return {
    chatLayout,
    setChatLayout,
    showChatInfo,
    setShowChatInfo,
  };
};

export default useLayout;
