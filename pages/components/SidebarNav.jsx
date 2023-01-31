import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsIcon from "@mui/icons-material/Settings";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import React from "react";

const SidebarNav = ({ value, setValue, isMobile }) => {
  return (
    <BottomNavigation
      sx={{
        boxShadow: "0px -5px 5px 0px #e4e4e4",
        position: isMobile ? "fixed" : "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bottom: isMobile ? 0 : "auto",
        p: 0,
        zIndex: 100000,
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Chats"
        icon={<ForumIcon />}
        sx={{ height: "100%" }}
      />
      <BottomNavigationAction
        label="Settings"
        icon={<SettingsIcon />}
        sx={{ height: "100%" }}
      />
      <BottomNavigationAction
        label="User"
        icon={<AccountCircleIcon />}
        sx={{ height: "100%" }}
      />
    </BottomNavigation>
  );
};

export default SidebarNav;
