import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type {Friend, ActiveChatItem} from "@/types";

interface chats {
  friends: Friend[];
}

const initialState: chats = {
  friends: [],
};

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setFriends: (
      state: chats,
      action: PayloadAction<typeof initialState.friends>
    ) => {
      state.friends = { ...action.payload };
    },

  },
});

export const { setFriends } = ChatSlice.actions;

export default ChatSlice.reducer;
