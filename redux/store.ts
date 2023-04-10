import { configureStore } from "@reduxjs/toolkit";
import ChatLayoutSlice from "./slices/chatLayoutProps";
import ChatSlice from "./slices/chatSlice";
import ActiveRouteSlice from "./slices/activeRouteSlice";
import ConversationSlice from './slices/conversationSlice'

export const store = configureStore({
    reducer: {
        chatLayout: ChatLayoutSlice,
        chat: ChatSlice,
        activeRoute: ActiveRouteSlice,
        conversation: ConversationSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch