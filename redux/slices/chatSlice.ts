import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type {Friend, ActiveChatItem} from "@/types";

interface chats {
  friends: Friend[];
  activeChat: ActiveChatItem
}

const initialState: chats = {
  friends: [],
  activeChat: {
    _id: '',
    first_name: '',
    last_name: '',
    active: false,
    avatar: '',
    email: '',
    joined: '',
  },
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

    setActiveChat: (
      state: chats,
      action: PayloadAction<typeof initialState.activeChat>
    ) => {
      state.activeChat = action.payload
    },
  },
});

export const { setFriends, setActiveChat } = ChatSlice.actions;

export default ChatSlice.reducer;
