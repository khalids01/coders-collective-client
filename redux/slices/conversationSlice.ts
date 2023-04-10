import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ConversationData } from "@/types";

const initialState: ConversationData = {
  messages: {
    type: "user",
    data: [],
  },
  sendMessageData: {
    receiver: null,
    sender: null,
    message: {
      text: null,
      images: [],
    },
  },
  conversationId: null,
};

export const ConversationSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (
      state: ConversationData,
      action: PayloadAction<typeof initialState.messages.data>
    ) => {
      state.messages.data = action.payload;
    },

    setSendMessageData: (
      state: ConversationData,
      action: PayloadAction<typeof initialState.sendMessageData>
    ) => {
      state.sendMessageData = action.payload;
    },

    setConverSationId: (
      state: ConversationData,
      action: PayloadAction<typeof initialState.conversationId>
    ) => {
      state.conversationId = action.payload;
    },
  },
});

export const { setMessages, setSendMessageData, setConverSationId } =
  ConversationSlice.actions;

export default ConversationSlice.reducer;
