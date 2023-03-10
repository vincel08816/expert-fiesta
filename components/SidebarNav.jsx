import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsIcon from "@mui/icons-material/Settings";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import React from "react";

const SidebarNav = ({ value = 0, setValue = () => {} }) => {
  return (
    <BottomNavigation
      sx={{
        boxShadow: "0px -5px 5px 0px #e4e4e4",
        alignItems: "center",
        justifyContent: "space-between",
        bottom: 0,
        p: 0,
        minHeight: "30px",
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        data-tut="reactour__conversation"
        label="Chats"
        icon={<ForumIcon />}
        sx={{ height: "100%" }}
      />
      <BottomNavigationAction
        data-tut="reactour__settings"
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
