import { useDispatch, useSelector } from "react-redux";
import {
  appendBotMessage,
  appendMessages,
  prependConversation,
  setMessages,
  setSelected,
  stopLoadingConversations,
  toggleCheckbox,
} from "../store/conversationsSlice";

const useRedux = () => {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state);
  const { conversations: convos, selected } = conversations;

  return {
    ...conversations,
    chatLog: selected === -1 ? [] : convos[selected].messages,
    prependConversation: (payload) => dispatch(prependConversation(payload)),
    setSelected: (payload) => dispatch(setSelected(payload)),
    stopLoadingConversations: () => dispatch(stopLoadingConversations()),
    appendMessages: (payload) => dispatch(appendMessages(payload)),
    toggleCheckbox: (payload) => dispatch(toggleCheckbox(payload)),
    setMessages: (payload) => dispatch(setMessages(payload)),
    appendBotMessage: (payload) => dispatch(appendBotMessage(payload)),
  };
};

export default useRedux;
