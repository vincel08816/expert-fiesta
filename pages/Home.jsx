import { Box } from "@mui/system";
import React from "react";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

/* {!} Maybe save to message mongo if I feel like it in the future */
/* {!} Add users and accounts perhaps too?  */

const App = () => {
  return (
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
      }}
    >
      <Topbar />
      <Sidebar />
      <Content />
    </Box>
  );
};

export default App;
