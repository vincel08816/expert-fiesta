import MailIcon from "@mui/icons-material/Mail";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUserContext } from "./_app";

export default function Unverified() {
  const router = useRouter();
  const { loading, user, setUser } = useUserContext();

  useEffect(() => {
    console.log(user);
    if (!loading && !user) router.push("/login");
    if (user?.role === "admin" || user?.role === "user") {
      router.push("/");
    }
  }, [loading, user]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f2ee",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          width: 500,
          p: 3,
          m: 1,
          boxShadow: 3,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ pb: 2, display: "flex", justifyContent: "center" }}
        >
          <Avatar
            alt="YIP YIP"
            src="https://cdn.discordapp.com/attachments/594312779545051221/1070921280016097340/sticker23.png"
            sx={{ width: 200, height: 200 }}
          />
        </Stack>
        <Typography
          variant="h5"
          component="h2"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Sorry! Your account is not yet verified!
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ pb: 2, display: "flex", justifyContent: "center" }}
        >
          <Typography>Contact me by LinkedIn or Email!</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ pb: 2, display: "flex", justifyContent: "center", mb: 2 }}
        >
          <IconButton
            sx={{ p: 1 }}
            href="https://linkedin.com/in/vincentlee28"
            target="_blank"
          >
            <img
              style={{ width: 35, height: 35 }}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="linkedin-footer"
            />
          </IconButton>
          <IconButton sx={{ p: 1 }}>
            <img
              style={{ width: 35, height: 35 }}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="github-footer"
            />
          </IconButton>
          <IconButton
            sx={{ p: 1 }}
            href="mailto:vincel08816@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <MailIcon sx={{ width: 35, height: 35 }} />
          </IconButton>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ pb: 2, display: "flex", justifyContent: "center", mb: 2 }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setUser();
              axios.delete("/api/user/logout").catch((error) => {
                console.error(error);
              });
            }}
          >
            <Typography>Logout</Typography>
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
