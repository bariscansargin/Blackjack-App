import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./features/user-info";
const store = configureStore({ reducer: { userInfo: userInfoReducer } });
export default store;
