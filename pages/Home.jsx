import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MenuIcon from "@mui/icons-material/Menu";
import { Tooltip } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Content from "../components/chatComponents/Content";
import SearchModal from "../components/SearchModal";
import SelectChat from "../components/sidebarComponents/SelectChat";
import Settings from "../components/sidebarComponents/Settings";
import UserPanel from "../components/sidebarComponents/UserPanel";
import SidebarNav from "../components/SidebarNav";
import { useAppContext } from "../contexts/AppContext";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    flex: 1,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    height: "100vh",

    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Home() {
  const { setChatLog, conversations, selected, loading, user } =
    useAppContext();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSelectMenu = Boolean(anchorEl);

  const SidebarArray = [<SelectChat />, <Settings />, <UserPanel />];

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

  const selectAll = (selected) =>
    setChatLog((prev) =>
      prev.map((message) => {
        return { ...message, selected };
      })
    );

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user]);

  if (loading)
    return (
      <Box
        sx={{
          pt: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <CircularProgress style={{ width: "60px", height: "60px" }} />
      </Box>
    );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <AlternateEmailIcon />
            <Typography sx={{ ml: 0.3, mr: 0.3, fontWeight: "bold" }}>
              OpenAI
            </Typography>
            <Typography
              sx={{ ml: 0.3, mr: 0.3, opacity: 0.6, fontWeight: 600 }}
            >
              &mdash;
            </Typography>
            <Typography sx={{ ml: 0.3, opacity: 0.6, fontSize: "12px" }}>
              {conversations && conversations[selected]?.title.length
                ? conversations[selected]?.title
                : "New Chat"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <SearchModal />
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
          width: drawerWidth,
          alignItems: "center",
          backgroundColor: "white",

          // flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
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
        <Divider />

        <SidebarNav value={value} setValue={setValue} />
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Content open={open} drawerWidth={drawerWidth} />
      </Main>
    </Box>
  );
}
