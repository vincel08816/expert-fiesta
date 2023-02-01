import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import React from "react";
import Swal from "sweetalert2";
import { useAppContext } from "../contexts/AppContext";
import IconsWithTooltips from "./IconsWithTooltips";

const Topbar = () => {
  const { setChatLog, setOpenSidebar, conversations, selected } =
    useAppContext();

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
    <AppBar sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconsWithTooltips
            sx={{ color: "black", mr: 1 }}
            Icon={MenuIcon}
            onClick={() => setOpenSidebar((prev) => !prev)}
          />
          <AlternateEmailIcon />
          <Typography sx={{ ml: 0.3, mr: 0.3, fontWeight: "bold" }}>
            OpenAI
          </Typography>
          <Typography sx={{ ml: 0.3, mr: 0.3, opacity: 0.6, fontWeight: 600 }}>
            &mdash;
          </Typography>
          <Typography sx={{ ml: 0.3, opacity: 0.6 }} variant="body2">
            {conversations && conversations[selected]?.title.length
              ? conversations[selected]?.title
              : "New Chat"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <IconsWithTooltips
            title="Select or Deselect All"
            sx={{ color: "black" }}
            Icon={DoneAllIcon}
            onClick={handleSelectAll}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
