import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
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
    <AppBar
      sx={{
        position: "relative",
        backgroundColor: "white",
        color: "black",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 20px",
        boxShadow: "0 0 8px rgba(0,0,0,.1)",
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
        <Typography sx={{ ml: 0.3, opacity: 0.6, fontSize: "12px" }}>
          {conversations && conversations[selected]?.title.length
            ? conversations[selected]?.title
            : "New Chat"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            height: 30,
            width: 180,
            margin: "3px 8px 0px",
            borderRadius: "8px",
            alignItems: "center",
            padding: "2px 13px",
            border: "1px solid #e2e5e9",
            cursor: "pointer",
            boxShadow: "0 0 5px rgba(0,0,0,.1);",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
              boxShadow: "0 0 10px rgba(0,0,0,.1);",
            },
          }}
        >
          <SearchIcon sx={{ width: 20 }} />
          <Typography
            sx={{
              fontSize: "13px",
              ml: 1.3,
              color: "#536270",
              "-webkit-touch-callout": "none",
              "-webkit-user-select": "none",
              "-khtml-user-select": "none",
              "-moz-user-select": "none",
              "-ms-user-select": "none",
              "user-select": "none",
            }}
          >
            Search...
          </Typography>
        </Box>
        <IconsWithTooltips
          title="Select or Deselect All"
          sx={{ color: "black" }}
          Icon={DoneAllIcon}
          onClick={handleSelectAll}
        />
      </Box>
    </AppBar>
  );
};

export default Topbar;

const SearchBox = styled.div`
  background-color: blue;
  height: 35px;
  width: 120px;
  margin: 0px 5px;
`;
