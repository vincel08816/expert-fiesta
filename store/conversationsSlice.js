import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  selected: -1,
  loadingConversations: false,
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations(state, action) {
      state.loadingConversations = false;
      state.conversations = action.payload;
    },
    prependConversation(state, action) {
      state.conversations = [action.payload, ...state.conversations];
    },
    setSelected(state, action) {
      state.selected = action.payload;
    },
    getSelectedId(state) {
      return state.conversations[state.selected]?._id;
    },
    stopLoadingConversations(state) {
      state.loadingConversations = false;
    },
  },
});

export const {
  setConversations,
  prependConversation,
  setSelected,
  getSelectedId,
  stopLoadingConversations,
} = conversationsSlice.actions;

export const conversationsReducer = conversationsSlice.reducer;
