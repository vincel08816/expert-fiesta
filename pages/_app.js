import { Box } from "@mui/system";
import axios from "axios";
import Head from "next/head";
import React, { createContext, useEffect, useState } from "react";
import { AppContextProvider } from "../contexts/AppContext";
import "./../styles/_app.css";

const UserContext = createContext();

export const useUserContext = () => {}

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
      .then((_) => setLoading(false));
  }, []);

  const userValues = { user, setUser, loading, conversations, setConversations };

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
        <AppContextProvider>
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
        </AppContextProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
