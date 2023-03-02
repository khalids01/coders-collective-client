import { configureStore } from "@reduxjs/toolkit";
import ChatLayoutSlice from "./slices/chatLayoutProps";

export const store = configureStore({
    reducer: {
        chatLayout: ChatLayoutSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch