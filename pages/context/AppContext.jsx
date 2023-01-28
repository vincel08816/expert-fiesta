import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
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
  const userData = useAuth();
  const chatProps = useChat(userData);

  return (
    <AppContext.Provider value={{ ...chatProps, ...userData }}>
      {children}
    </AppContext.Provider>
  );
};
