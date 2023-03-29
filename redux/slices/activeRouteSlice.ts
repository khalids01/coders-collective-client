import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ActiveRoute {
  activeRoute:{
    route: string
  }
}

const initialState: ActiveRoute = {
    activeRoute:{
        route: '/dashboard'
    }  
};

export const ActiveRouteSlice = createSlice({
  name: "chatLayout",
  initialState,
  reducers: {
    changeActiveRoute: (
      state: ActiveRoute,
      action: PayloadAction<typeof initialState.activeRoute.route>
    ) => {
      state.activeRoute.route =  action.payload 
    },
  
  },
});

export const { changeActiveRoute } = ActiveRouteSlice.actions;

export default ActiveRouteSlice.reducer;
