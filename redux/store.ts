import { configureStore } from "@reduxjs/toolkit";
import ChatLayoutSlice from "./slices/chatLayoutProps";
import ChatSlice from "./slices/chatSlice";
import ActiveRouteSlice from "./slices/activeRouteSlice";

export const store = configureStore({
    reducer: {
        chatLayout: ChatLayoutSlice,
        chat: ChatSlice,
        activeRoute: ActiveRouteSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch