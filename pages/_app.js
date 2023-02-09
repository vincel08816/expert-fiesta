import { Box } from "@mui/system";
import axios from "axios";
import Head from "next/head";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../store";
import "./../styles/_app.css";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

function App({ Component, pageProps }) {
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
      <UserContext.Provider value={userValues}>
        <Provider store={store}>
          <Box
            sx={{
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
            }}
          >
            <Component {...pageProps} />
          </Box>
        </Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
