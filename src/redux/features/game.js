import { createSlice } from "@reduxjs/toolkit";

const gameInfo = createSlice({
  name: "gameInfo",
  initialState: { userMoney: 0 },
  reducers: {
    changeMoney(state, action) {
      state.userMoney += action.payload.value;
    },
  },
});


const gameActions = gameInfo.actions;
export default gameInfo.reducer;

