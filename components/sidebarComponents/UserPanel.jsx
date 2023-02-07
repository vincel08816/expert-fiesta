import { TextareaAutosize } from "@mui/base";
import CheckIcon from "@mui/icons-material/Check";
import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Badge, Divider, IconButton, styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../../pages/_app";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "2px solid #44b700",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(0.9)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2)",
      opacity: 0,
    },
  },
}));

const boxSx = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  p: 1,
  alignItems: "center",
  // justifyContent: "center",
  border: "1px solid transparent",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    cursor: "pointer",
  },
};

const LargeDot = styled(Box)(({ theme }) => ({
  backgroundColor: "#44b700",
  borderRadius: "50%",
}));

const UserPanel = (display) => {
  const { user, setUser } = useUserContext();
  const [bio, setBio] = useState("");
  const [users, setUsers] = useState([]); // unverified users of course

  const getUnverifiedUsers = () => {
    if (user?.role === "admin") {
      axios
        .get("/api/user/unverified")
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => getUnverifiedUsers, [user?.role]);

  const handleVerify = async (userId) => {
    const response = await Swal.fire({
      title: "Verify User?",
      text: "HEHEHEHEHEHEHEHEHE!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    });
    if (response.isConfirmed) {
      try {
        await axios.put("/api/user/verify", { userId });
        await getUnverifiedUsers();
        Swal.fire({
          icon: "success",
          title: "User Verified",
          text: "What do you mean hehe!!?!?!?",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: error.message,
        });
      }
    }
  };

  return (
    <Box
      key="User Panel"
      sx={{
        flex: 1,
        display,
        flexDirection: "column",
        p: 3,
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stack direction="row" spacing={2} sx={{ pb: 2 }}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<LargeDot />}
        >
          <Avatar
            alt="YIP YIP"
            src="https://media.discordapp.net/attachments/594312779545051221/1069314177446985798/sticker34.png"
            sx={{ width: 200, height: 200 }}
          />
        </StyledBadge>
      </Stack>
      <Divider light />
      <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" sx={{ minWidth: "70px" }}>
          {user?.username}
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
          Biography
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            minWidth: 250,
          }}
        >
          <TextareaAutosize
            placeholder="Tell me a little bit about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{
              padding: "12px",
              minHeight: "100px",
              maxHeight: "250px",
              fontFamily: "Noto Sans, sans-serif",
              overflow: "auto",
              flex: 1,
            }}
          />
        </Box>
      </Stack>
      {user?.role === "admin" ? (
        <Box sx={{ mt: 5, minWidth: 250 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ flex: 1 }}>Unverified Users</Typography>
              <IconButton
                sx={{ maxHeight: 20, maxWidth: 20 }}
                onClick={getUnverifiedUsers}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
            {users.map(({ _id, username, why }) => (
              <Box
                key={_id}
                sx={{
                  p: 2,
                  mt: 1,
                  mb: 1,
                  border: "1px solid #bcdbfd",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Typography variant="caption">User: {username}</Typography>
                <Typography variant="caption" sx={{ ml: 1.5, flex: 1 }}>
                  Desc: {why?.length < 30 ? why : why.substring(0, 27) + "..."}
                </Typography>

                <IconButton onClick={() => handleVerify(_id)}>
                  <CheckIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        ""
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1,
          width: "100%",
        }}
      >
        <Box
          sx={boxSx}
          onClick={() => {
            setUser();
            axios.delete("/api/user/logout").catch((error) => {
              console.error(error);
            });
          }}
        >
          <LogoutIcon />
          <Typography sx={{ ml: 2 }}>Logout</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPanel;
