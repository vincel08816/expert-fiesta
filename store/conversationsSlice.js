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

    /* these are just potential things to ad  d */
    // appendMessages(state, action) {
    //   const { _id, messages } = action.payload;
    //   const index = state.conversations.find(({ _id: id }) => id === _id);

    //   state.conversations[index].messages = [
    //     ...messages,
    //     ...state.conversations[index].messages,
    //   ];
    // },
    // toggleCheckbox(state, action) {
    //   const { conversations, selected } = state;
    //   const messages = conversations[selected].messages;
    //   messages[action.payload].selected = !messages[action.payload]?.selected;
    // },
    // setMessages(state, action) {
    //   const { _id, messages } = action.payload;
    //   const index = state.conversations.find(({ _id: id }) => id === _id);
    //   state.conversations[index].messages = messages;
    // },
    // appendBotMessage(state, action) {
    //   const { conversations, selected } = state;
    //   const { _id, newBotMessage } = action.payload;

    //   const messages = conversations[selected].messages;
    //   messages[messages.length - 1]._id = _id;
    //   messages.push(newBotMessage);
    // },
  },
});

export const {
  setConversations,
  prependConversation,
  setSelected,
  getSelectedId,
  stopLoadingConversations,
  // appendMessages,
  // toggleCheckbox,
  // setMessages,
  // appendBotMessage,
} = conversationsSlice.actions;

export const conversationsReducer = conversationsSlice.reducer;
