import { Box } from "@mui/system";
import Head from "next/head";
import React from "react";
import Topbar from "../components/Topbar";
import { AppContextProvider } from "../contexts/AppContext";

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
      <AppContextProvider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            alignItems: "center",
            height: "100vh",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            fontFamily: "Noto Sans, sans-serif",
          }}
        >
          <Topbar />
          <Component {...pageProps} />
        </Box>
      </AppContextProvider>
    </>
  );
}

export default App;
