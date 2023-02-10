import { Box } from "@mui/system";
import axios from "axios";
import Head from "next/head";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { setConversations } from "../store/conversationsSlice";
import { setLoading, setUser } from "../store/userSlice";

import store from "../store";
import "./../styles/_app.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon.png"
        />
        <title>MenheraGPT</title>
      </Head>
      <UserProvider>
        <Provider store={store}>
          <AppWrapper children={<Component {...pageProps} />} />
        </Provider>
      </UserProvider>
    </>
  );
}

export default App;

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const handleSetUser = (user) => dispatch(setUser(user));
  const handleSetConversations = (user) => dispatch(setConversations(user));
  const handleSetLoading = (payload) => dispatch(setLoading(payload));
  const authenticateUser = async () => {
    try {
      const response = await axios.get("/api/auth");
      const { user, conversations } = response.data;

      handleSetUser(user);
      handleSetConversations(conversations);
    } catch (error) {
      console.error(error);
    }

    handleSetLoading(false);
  };

  useEffect(() => {
    authenticateUser();
  }, []);
  return <Box sx={appSx}>{children}</Box>;
};

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios
      .get("/api/auth")
      .then(({ data: { user, conversations } }) => {
        setUser(user);
        setConversations(conversations);
      })
      .catch((err) => console.error(err))
      .then(() => setLoading(false));
  }, []);

  const userValues = {
    user,
    setUser,
    loading,
    conversations,
    setConversations,
  };

  return (
    <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
  );
};

const appSx = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  height: "100vh",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  fontFamily: "Noto Sans, sans-serif",
  overflow: "hidden",
};
