import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "../pages/_app";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const { conversations, setConversations } = useUserContext();
  const [selected, setSelected] = useState(); // selected Conversation index
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [chatLog, setChatLog] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [autoSelect, setAutoSelect] = useState(true);

  // useDebug(form, chatLog, user);

  const toggleCheck = (user, index) => {
    setChatLog((prev) => {
      let copy = [...prev];
      copy[index].selected = !copy[index].selected;
      return copy;
    });
  };

  // listener for conversation selection; changes when selected or converation length changes
  useEffect(() => {
    if (!loadingMessages && typeof selected !== "undefined") {
      setLoadingMessages(true);
      axios
        .get(`/api/message/${conversations[selected]?._id}`)
        .then((res) => setChatLog(res.data.messages))
        .catch((err) => console.error(err))
        .then(() => setLoadingMessages(false));
    }
  }, [selected, conversations?.length]);

  // submit new message
  const value = {
    /* Selecting Chat */
    conversations,
    setConversations,
    selected,
    setSelected,
    loadingMessages,
    setLoadingMessages,

    /* Settings */
    autoSelect,
    setAutoSelect,

    /* Chat Data */
    chatLog,
    setChatLog,
    isSending,
    setIsSending,
    toggleCheck,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
