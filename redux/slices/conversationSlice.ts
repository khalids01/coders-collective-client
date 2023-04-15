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
  roomId: null,
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
      action: PayloadAction<typeof initialState.roomId>
    ) => {
      state.roomId = action.payload;
    },
  },
});

export const { addANewMessage, setConverSationId, addMessages } = ConversationSlice.actions;

export default ConversationSlice.reducer;
