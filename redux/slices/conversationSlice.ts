import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ConversationData, Message } from "@/types";

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
  chat_name: null,
};

export const ConversationSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addANewMessage: (
      state: ConversationData,
      action: PayloadAction<Message>
    ) => {
      state.messages.data.push(action.payload);
    },

    addMessages: (
      state: ConversationData,
      action: PayloadAction<Message[]>
    ) => {
      state.messages.data = action.payload;
    },

    setConverSationId: (
      state: ConversationData,
      action: PayloadAction<typeof initialState.chat_name>
    ) => {
      state.chat_name = action.payload;
    },
  },
});

export const { addANewMessage, setConverSationId, addMessages } = ConversationSlice.actions;

export default ConversationSlice.reducer;
