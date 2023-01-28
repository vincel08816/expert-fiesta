import Head from "next/head";
import React from "react";
import { AppContextProvider } from "./context/AppContext";

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
        <Component {...pageProps} />
      </AppContextProvider>
    </>
  );
}

export default App;
