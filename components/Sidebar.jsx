import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import SelectChat from "./sidebarComponents/SelectChat";
import Settings from "./sidebarComponents/Settings";
import UserPanel from "./sidebarComponents/UserPanel";
import SidebarNav from "./SidebarNav";

const Sidebar = (props) => {
  const { openSidebar, setOpenSidebar } = useAppContext();
  const [isMobile, setIsMobile] = useState(false);
  const [value, setValue] = useState(1);

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  const SidebarArray = [
    <SelectChat {...props} />,
    <Settings {...props} isMobile={isMobile} />,
    <UserPanel {...props} isMobile={isMobile} />,
  ];

  const toggleDrawer = () => setOpenSidebar((prev) => !prev);

  useEffect(() => {}, []);

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
          width: isMobile ? "100%" : 300,
          borderRadius: "10px 0 0 10px",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        {SidebarArray[value]}
        <SidebarNav
          {...props}
          value={value}
          setValue={setValue}
          isMobile={isMobile}
        />
      </Paper>
      <Box sx={{ flex: 1 }} onClick={toggleDrawer} />
    </Box>
  );
};

export default Sidebar;
