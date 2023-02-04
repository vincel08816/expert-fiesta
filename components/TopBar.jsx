import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MenuIcon from "@mui/icons-material/Menu";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import {
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import MoveConversationModal from "./MoveConversationModal";
import SearchModal from "./SearchModal";
import SelectChat from "./sidebarComponents/SelectChat";
import Settings from "./sidebarComponents/Settings";
import UserPanel from "./sidebarComponents/UserPanel";
import SidebarNav from "./SidebarNav";

const drawerWidth = 280;

const SidebarArray = [<SelectChat />, <Settings />, <UserPanel />];

const presets = [
  {
    title: "None",
    text: "",
  },
  {
    title: "default",
    text: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.",
  },
  {
    title: "Code",
    text: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. 
    The assistant will wrap code blocks in 3 backticks followed by the language and a new line. But don't do that with for non-code responses.
  `,
  },
];

const PromptHeaderPreset = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleChange } = useAppContext();

  return (
    <>
      <Button
        variant="contained"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          border: "2px solid rgba(0,0,0,.1)",
          p: 0.5,
          mt: 0.2,
          borderRadius: "8px",
        }}
      >
        Preset
      </Button>
      <Menu
        sx={{ borderRadius: "8px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={openSelectMenu}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {presets.map(({ title, text }) => (
          <MenuItem
            sx={{ fontSize: "12px" }}
            name="topText"
            value={text}
            onClick={(e) => {
              handleChange(e);
              setAnchorEl(null);
            }}
          >
            {title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "white",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: "white",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const TopBar = ({
  open,
  setOpen,
  value,
  setValue,
  handleDrawerClose,
  handleDrawerOpen,
  anchorEl,
  setAnchorEl,
}) => {
  const { setChatLog, conversations, selected, autoSelect, setAutoSelect } =
    useAppContext();
  const theme = useTheme();
  const openSelectMenu = Boolean(anchorEl);

  const selectAll = (selected) =>
    setChatLog((prev) =>
      prev.map((message) => {
        return { ...message, selected };
      })
    );

  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          boxShadow: "0 0 6px rgba(0,0,0,.1)",
          borderBottom: "1px solid rgba(0,0,0,.1 ",
          backgroundColor: "white",
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "white",
            color: "black",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            ml: open ? drawerWidth + "px" : 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <AlternateEmailIcon />
            <Typography sx={{ ml: 0.2, mr: 0.3, fontWeight: "bold" }}>
              OpenAI
            </Typography>
            <Typography
              sx={{
                ml: 0.3,
                mr: 0.3,
                opacity: 0.6,
                fontWeight: 600,
                "@media (max-width: 600px)": {
                  display: "none",
                },
              }}
            >
              &mdash;
            </Typography>
            <Typography
              sx={{
                ml: 0.3,
                opacity: 0.6,
                fontSize: "12px",
                "@media (max-width: 600px)": {
                  display: "none",
                },
              }}
            >
              {conversations && conversations[selected]?.title.length
                ? conversations[selected]?.title
                : "New Chat"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <SearchModal />
            <MoveConversationModal />

            <Tooltip title="Automate Chat History">
              <IconButton
                onClick={(event) => setAutoSelect((prev) => !prev)}
                sx={{
                  // display: "none",
                  border: `2px solid ${
                    autoSelect ? "#3085d6" : "rgba(0,0,0,.1)"
                  }`,
                  p: 0.5,
                  mt: 0.2,
                  mr: 1,
                  borderRadius: "8px",
                }}
              >
                <PrecisionManufacturingIcon
                  data-tut="reactour__automate"
                  sx={{
                    width: 20,
                    height: 20,
                    color: autoSelect ? "#3085d6" : "inherit",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Select or Deselect All">
              <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
                  border: "2px solid rgba(0,0,0,.1)",
                  p: 0.5,
                  mt: 0.2,
                  borderRadius: "8px",
                }}
              >
                <DoneAllIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ borderRadius: "8px" }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={openSelectMenu}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                sx={{ fontSize: "12px" }}
                onClick={() => {
                  selectAll(true);
                  setAnchorEl(null);
                }}
              >
                Select All
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "12px" }}
                onClick={() => {
                  selectAll(false);
                  setAnchorEl(null);
                }}
              >
                Deselect All
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          display: "flex",
          flexDirection: "column",
          width: drawerWidth,
          alignItems: "center",
          backgroundColor: "white",
          maxHeight: "100vh",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            maxHeight: "100vh",
            // boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {SidebarArray[value]}
        <SidebarNav value={value} setValue={setValue} />
      </Drawer>
    </>
  );
};

export default TopBar;
