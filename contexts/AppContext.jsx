import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "../pages/_app";

const AppContext = createContext();

const initialForm = {
  model: "text-davinci-003",
  size: "256x256",
  n: 1,
  temperature: 1,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  bestOf: 1,
  text: "",
  topText: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. 
    The assistant will wrap code blocks in 3 backticks followed by the language and a new line. But don't do that with for non-code responses.
  `,
};

const useDebug = (form, chatLog, user) => {
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "development") console.log("form", form);
  // }, [form]);
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "development") console.log("chatLog", chatLog);
  // }, [chatLog]);
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "development") console.log("user", user);
  // }, [user]);
};

/*
 * This is a wrapper component that provides context to all the components.
 * This includes user, form, and chatLog.
 */

export const useChat = ({ user, conversations, setConversations }) => {
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
        .then(() => {
          setLoadingMessages(false);
        });
    }
  }, [selected, conversations?.length]);

  // submit new message

  return {
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
};

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

export const AppContextProvider = ({ children }) => {
  const userData = useUserContext();
  const { user, loading } = userData;
  // const { width, height } = useWindowSize();

  const chatProps = useChat({
    ...userData,
  });
  const [isTourOpen, setIsTourOpen] = useState(false);
  const closeTour = () => setIsTourOpen(false);

  useEffect(() => {
    if (loading || !user) return;
    if (!["admin", "user"].includes(user.role)) {
      localStorage.setItem("MenheraGPTTour", "true");
      setIsTourOpen(true);
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ ...chatProps, isTourOpen, closeTour }}>
      {children}
    </AppContext.Provider>
  );
};
