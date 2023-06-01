import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "user-info",
  initialState: { name: "", deckCount: "",},
  reducers: {
    getUserInfo(state, action) {
      state.name = action.payload.username;
      state.deckCount = action.payload.deckCount;
      
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;
