import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  selected: -1,
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    prependConversation: (state, action) => {
      state.conversations = [action.payload, ...state.conversations];
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    getSelectedId: (state) => {
      return state.conversations[state.selected]?._id;
    },
  },
});

export const {
  setConversations,
  prependConversation,
  setSelected,
  getSelectedId,
} = conversationsSlice.actions;

export const conversationsReducer = conversationsSlice.reducer;
