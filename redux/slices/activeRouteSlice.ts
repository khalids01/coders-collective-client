import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ActiveRoute {
    route: string;
    chatRoute: string;
}

const initialState: ActiveRoute = {
        route: '/dashboard',
        chatRoute: '/chat'
};

export const ActiveRouteSlice = createSlice({
  name: "chatLayout",
  initialState,
  reducers: {
    changeActiveRoute: (
      state: ActiveRoute,
      action: PayloadAction<typeof initialState.route>
    ) => {
      state.route =  action.payload 
    },

    changeChatRoute: (
      state: ActiveRoute,
      action: PayloadAction<typeof initialState.chatRoute>
    ) => {
      state.chatRoute =  action.payload 
    }
  
  },
});

export const { changeActiveRoute, changeChatRoute } = ActiveRouteSlice.actions;

export default ActiveRouteSlice.reducer;
