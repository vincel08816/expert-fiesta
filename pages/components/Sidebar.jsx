import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAppContext } from "../context/AppContext";
import SelectChat from "./sidebarComponents/SelectChat";
import Settings from "./sidebarComponents/Settings";
import UserPanel from "./sidebarComponents/UserPanel";
import SidebarNav from "./SidebarNav";

const Sidebar = (props) => {
  const { openSidebar, setOpenSidebar } = useAppContext();
  const [value, setValue] = React.useState(0);

  const SidebarArray = [
    <SelectChat {...props} />,
    <Settings {...props} />,
    <UserPanel {...props} />,
  ];

  const toggleDrawer = () => setOpenSidebar((prev) => !prev);

  return (
    <Box
      sx={{
        display: openSidebar ? "flex" : "none",
        position: "fixed",
        zIndex: 1000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          width: 300,
          borderRadius: "10px 0 0 10px",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        {SidebarArray[value]}
        <SidebarNav {...props} value={value} setValue={setValue} />
      </Paper>
      <Box sx={{ flex: 1 }} onClick={toggleDrawer} />
    </Box>
  );
};

export default Sidebar;
