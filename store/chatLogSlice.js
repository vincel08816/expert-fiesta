import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chatLog: [],
  selected: undefined,
  loadingChatLog: false,
  chatLog: [],
  isSending: false,
  autoSelect: true,
};

const chatLogSlice = createSlice({
  name: "chatLog",
  initialState,
  reducers: {
    setChatLog: (state, action) => {
      state.chatLog = action.payload;
    },
    setLoadingChatLog: (state, action) => {
      state.loadingChatLog = action.payload;
    },
    appendChatLog: (state, action) => {
      state.chatLog = [...state.chatLog, action.payload];
    },
    setIsSending: (state, action) => {
      state.isSending = action.payload;
    },
    setAutoSelect: (state) => {
      state.autoSelect = !state.autoSelect;
    },
    toggleCheckbox: (state, action) => {
      state.chatLog[action.payload].selected =
        !state.chatLog[action.payload]?.selected;
    },
    appendBotMessage: ({ chatLog }, { payload: { newElement, _id } }) => {
      chatLog[chatLog.length - 1]._id = _id;
      chatLog.push(newElement);
    },
  },
});

/* this is the conversation id conversations[selected]?._id */

export const fetchChatLog = createAction("fetchChatLog", (selected) => {
  return (dispatch) => {
    axios
      .get(`/api/message/${selected}`)
      .then((res) => dispatch(setChatLog(res.data.chatLog)))
      .catch((err) => console.error(err));
  };
});

export const {
  setLoadingChatLog,
  setChatLog,
  appendChatLog,
  setIsSending,
  setAutoSelect,
  toggleCheckbox,
  appendBotMessage,
} = chatLogSlice.actions;

export const chatLogReducer = chatLogSlice.reducer;
