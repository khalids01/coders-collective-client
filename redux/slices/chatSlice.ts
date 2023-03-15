import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type Friend from "@/types/friend";

interface Chats {
  friends: Friend[];
}

const initialState: Chats = {
  friends: [],
};

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setFriends: (
      state: Chats,
      action: PayloadAction<typeof initialState.friends>
    ) => {
      state.friends = { ...action.payload };
    },
  },
});

export const { setFriends } = ChatSlice.actions;

export default ChatSlice.reducer;
