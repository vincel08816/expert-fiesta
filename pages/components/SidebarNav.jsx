import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsIcon from "@mui/icons-material/Settings";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import React from "react";

const SidebarNav = () => {
  const [value, setValue] = React.useState(1);

  return (
    <BottomNavigation
      sx={{
        boxShadow: "0px -5px 5px 0px #e4e4e4",
        width: "100%",
        height: "60px",
        maxHeight: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Chats" icon={<ForumIcon />} />
      <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      <BottomNavigationAction label="User" icon={<AccountCircleIcon />} />
    </BottomNavigation>
  );
};

export default SidebarNav;
