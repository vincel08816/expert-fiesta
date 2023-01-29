import { createContext, useContext } from "react";
import { useChat } from "../hooks/useChat";

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

export const AppContextProvider = ({ children }) => {
  const chatProps = useChat();

  return (
    <AppContext.Provider value={{ ...chatProps }}>
      {children}
    </AppContext.Provider>
  );
};
