import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./features/user-info";
import gameInfoReducer from "./features/game";
const store = configureStore({
  reducer: { userInfo: userInfoReducer, gameInfo: gameInfoReducer },
});
export default store;
