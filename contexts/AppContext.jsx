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

/*
 * This is a wrapper component that provides context to all the components.
 * This includes user, form, and chatLog.
 */

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const AppContextProvider = ({ children }) => {
  const { user, conversations, setConversations } = useUserContext();
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
    if (loadingMessages) return;

    if (conversations?.length > 0 && typeof selected !== "undefined") {
      setLoadingMessages(true);

      axios
        .get(`/api/message/` + conversations[selected]?._id)
        .then((res) => {
          const messages = res.data.messages.map((message) => {
            return {
              ...message,
              user: message.isBot ? "OpenAI" : user.username,
            };
          });
          setChatLog(messages);
        })
        .catch((err) => console.error(err))
        .then(async () => {
          await delay(500);
          setLoadingMessages(false);
        });
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
