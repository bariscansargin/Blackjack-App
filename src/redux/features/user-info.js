import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "user-info",
  initialState: { name: "", deckCount: "" },
  reducers: {
    getUserInfo(state, action) {
      console.log(state);
      console.log(action);
    },
  },
});

export const userInfoActions = userInfoSlice.actions; // Eylem yaratıcısını parçalayın (destructure)
export default userInfoSlice.reducer;