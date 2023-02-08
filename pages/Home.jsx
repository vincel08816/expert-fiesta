import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import Content from "../components/chatComponents/Content";
import TopBar from "../components/TopBar";
import Tutorial from "../components/Tutorial";
import { AppContextProvider } from "../contexts/AppContext";
import { FormContextProvider } from "../contexts/FormContext";
import useWindowSize from "../hooks/useWindowSize";
import { useUserContext } from "./_app";

// {!} Move to utility file later
const EventContext = createContext();

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEventContext must be used within a EventProvider");
  }
  return context;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={0} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const router = useRouter();
  const { loading, user } = useUserContext();

  // events
  const [open, setOpen] = useState(true); // drawer open
  const [value, setValue] = useState(0); // which tab value is selected
  const [anchorEl, setAnchorEl] = React.useState(null); // what is this for again?

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const [isTourOpen, setIsTourOpen] = useState(false);
  const closeTour = () => setIsTourOpen(false);

  useEffect(() => {
    if (loading || !user) return;
    if (!["admin", "user"].includes(user.role)) {
      localStorage.setItem("MenheraGPTTour", "true");
      setIsTourOpen(true);
    }
  }, [user]);

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user?.role === "unverified") router.push("/unverified");
  }, [loading, user]);

  const eventProps = {
    // snackbar props
    snackbarOpen,
    setSnackbarOpen,
    snackbarText,
    setSnackbarText,
    closeTour,
    isTourOpen,
    setIsTourOpen,
  };

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
    <EventContext.Provider value={eventProps}>
      <FormContextProvider>
        <AppContextProvider>
          <Box sx={{ display: "flex", maxHeight: "100vh" }}>
            <Tutorial />

            <CssBaseline />
            <TopBar
              {...{
                open,
                value,
                setValue,
                handleDrawer: () => setOpen((prev) => !prev),
                anchorEl,
                setAnchorEl,
              }}
            />

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={1000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {snackbarText}
              </Alert>
            </Snackbar>

            <StyledMain open={open}>
              <DrawerHeader />
              <Content />
            </StyledMain>
          </Box>
        </AppContextProvider>
      </FormContextProvider>
    </EventContext.Provider>
  );
}

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
  useWindowSize().width > 600 ? (
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
