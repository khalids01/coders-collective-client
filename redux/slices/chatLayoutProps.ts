import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChatLayoutProps {
  conversation: {
    header: {
      height: number;
    };
    dialogues: {
      height: number | string;
    };
    form: {
      height: number | string;
    };
  };
  chatInfo: {
    showInfo: boolean;
  };
  mainNavDrawer: {
    show: boolean;
  };
}

const initialState: ChatLayoutProps = {
  conversation: {
    header: {
      height: 70,
    },
    dialogues: {
      height: "100%",
    },
    form: {
      height: 80,
    },
  },
  chatInfo: {
    showInfo: false,
  },
  mainNavDrawer: {
    show: false,
  },
};

export const ChatLayoutSlice = createSlice({
  name: "chatLayout",
  initialState,
  reducers: {
    conversation: (
      state: ChatLayoutProps,
      action: PayloadAction<typeof initialState.conversation>
    ) => {
      state.conversation = { ...state.conversation, ...action.payload };
    },
    formHeight: (
      state: ChatLayoutProps,
      action: PayloadAction<typeof initialState.conversation.form.height>
    ) => {
      state.conversation.form.height = action.payload;
    },
    showChatInfo: (
      state: ChatLayoutProps,
      action: PayloadAction<typeof initialState.chatInfo.showInfo>
    ) => {
      state.chatInfo = { ...state.chatInfo, showInfo: action.payload };
    },
    showMainNavDrawer: (
      state: ChatLayoutProps,
      action: PayloadAction<typeof initialState.mainNavDrawer.show>
    ) => {
      state.mainNavDrawer.show = action.payload;
    },
  },
});

export const { conversation, showChatInfo, showMainNavDrawer, formHeight } =
  ChatLayoutSlice.actions;

export default ChatLayoutSlice.reducer;
