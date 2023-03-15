import { configureStore } from "@reduxjs/toolkit";
import ChatLayoutSlice from "./slices/chatLayoutProps";
import ChatSlice from "./slices/chatSlice";

export const store = configureStore({
    reducer: {
        chatLayout: ChatLayoutSlice,
        chat: ChatSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch