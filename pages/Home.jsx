import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/system";
import React from "react";
import Swal from "sweetalert2";
import { AppContextProvider, useAppContext } from "./AppContext";
import Content from "./components/Content";
import IconsWithTooltips from "./components/IconsWithTooltips";
import Sidebar from "./components/Sidebar";

/* {!} Maybe save to message mongo if I feel like it in the future */
/* {!} Add users and accounts perhaps too?  */

const Header = () => {
  const { setChatLog, setOpenSidebar } = useAppContext();

  const handleSelectAll = async () => {
    const response = await Swal.fire({
      title: "Select",
      text: "Select or deselect all items",
      icon: "question",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: "success",
      confirmButtonText: "Select all",
      denyButtonColor: "error",
      denyButtonText: "Deselect all",
      cancelButtonText: "Cancel",
      cancelButtonColor: "secondary",
    });

    if (response.isConfirmed || response.isDenied) {
      setChatLog((prev) =>
        prev.map((message) => {
          return { ...message, selected: response.isConfirmed };
        })
      );
    }
  };
  return (
    <AppBar sx={{ p: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconsWithTooltips
            sx={{ color: "white" }}
            Icon={MenuIcon}
            onClick={() => setOpenSidebar((prev) => !prev)}
          />
          <AlternateEmailIcon />
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>OpenAI</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <IconsWithTooltips
            title="Select or Deselect All"
            sx={{ color: "white" }}
            Icon={DoneAllIcon}
            onClick={handleSelectAll}
          />
        </Box>
      </Box>
    </AppBar>
  );
};

const App = () => {
  return (
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
        }}
      >
        <Header />
        <Sidebar />
        <Content />
      </Box>
    </AppContextProvider>
  );
};

export default App;
