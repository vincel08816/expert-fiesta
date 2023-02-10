import { configureStore } from "@reduxjs/toolkit";
import { conversationsReducer } from "./conversationsSlice";
import { chatLogReducer } from "./chatLogSlice";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationsReducer,
    chatLog: chatLogReducer,
  },
});

export default store;
