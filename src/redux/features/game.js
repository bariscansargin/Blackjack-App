import { createSlice } from "@reduxjs/toolkit";

const gameInfo = createSlice({
  name: "gameInfo",
  initialState: { userMoney: 0 },
  reducers: {
    initialMoney(state, action) {
      state.userMoney = +action.payload;
    },
    exchangeMoney(state, action) {
      state.userMoney += +action.payload;
    },
  },
});

export const gameActions = gameInfo.actions;
export default gameInfo.reducer;
