import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Content from "../components/chatComponents/Content";
import TopBar from "../components/TopBar";
import Tutorial from "../components/Tutorial";
import { useAppContext } from "../contexts/AppContext";

const drawerWidth = 280;

const mainSx = {
  flex: 1,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...mainSx,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      maxHeight: "100vh",

      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const StyledMain = ({ children, open }) =>
  useAppContext().width > 600 ? (
    <Main open={open}>{children}</Main>
  ) : (
    <Box sx={mainSx}>{children}</Box>
  );

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Home() {
  const { loading, user } = useAppContext();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user?.role === "unverified") router.push("/unverified");
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
    <Box sx={{ display: "flex", maxHeight: "100vh" }}>
      <Tutorial />

      <CssBaseline />
      <TopBar
        {...{
          open,
          setOpen,
          value,
          setValue,
          handleDrawerClose,
          handleDrawerOpen,
          anchorEl,
          setAnchorEl,
        }}
      />

      <StyledMain open={open}>
        <DrawerHeader />
        <Content />
      </StyledMain>
    </Box>
  );
}
