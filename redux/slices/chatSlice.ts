import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Friend } from "@/types";
import { SocketUser } from "@/Layouts/MainLayout";


interface chats {
  friends: Friend[];
  activeUsers: SocketUser[];
}

const initialState: chats = {
  friends: [],
  activeUsers: [],
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

    setActiveUsers: (
      state: chats,
      action: PayloadAction<typeof initialState.activeUsers>
    ) => {
      state.activeUsers = action.payload;
    },
  },
});

export const { setFriends, setActiveUsers } = ChatSlice.actions;

export default ChatSlice.reducer;
