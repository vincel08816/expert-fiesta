import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
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
  const [value, setValue] = useState(0);

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  const SidebarArray = [
    <SelectChat />,
    <Settings {...props} isMobile={isMobile} />,
    <UserPanel {...props} isMobile={isMobile} />,
  ];

  const toggleDrawer = () => setOpenSidebar((prev) => !prev);

  useEffect(() => {}, []);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={openSidebar}
      sx={{
        position: "fixed",
        borderRadius: "10px 0 0 10px",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          pt: 1,
          pb: 1,
          display: "flex",
          flexDirection: "row-reverse",
          width: "100%",
          borderBottom: "1px solid rgba(0,0,0,.1)",
        }}
      >
        <IconButton sx={{ mr: 2 }} onClick={toggleDrawer}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>

      {SidebarArray[value]}
      <SidebarNav
        {...props}
        value={value}
        setValue={setValue}
        isMobile={isMobile}
      />
    </Drawer>
  );
};

export default Sidebar;
