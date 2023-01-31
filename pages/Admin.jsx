import CheckIcon from "@mui/icons-material/Check";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAppContext } from "../contexts/AppContext";

const Admin = () => {
  const { user, loading } = useAppContext();
  const [users, setUsers] = useState([]);

  const getUnverifiedUsers = async () => {
    if (user?.role === "admin") {
      axios
        .get("/api/user/unverified")
        .then((res) => {
          setUsers(res.data);
          console.log("unverified users", res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => getUnverifiedUsers, [user?.role]);

  if (loading || user?.role !== "admin") {
    return (
      <Box sx={{ mt: 10, display: "flex", p: 5 }}>
        <Typography>You are not an admin</Typography>
      </Box>
    );
  }

  const HandleVerify = async (userId) => {
    const response = await Swal.fire({
      title: "Verify User?",
      text: "HEHEHEHEHEHEHEHEHEHE!",
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
    <Box sx={{ mt: 10, p: 5 }}>
      <Typography variant="h4" sx={{ mb: 2, flex: 1 }}>
        Unverified Users
      </Typography>
      <Divider light sx={{ mb: 1 }} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {users.map(({ _id, username, why }) => (
          <Box
            key={_id}
            sx={{
              p: 3,
              mt: 1,
              mb: 1,
              border: "1px solid #bcdbfd",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography>User: {username}</Typography>
            <Typography sx={{ ml: 1.5, flex: 1 }}>Desc: {why}</Typography>
            <IconButton onClick={() => HandleVerify(_id)}>
              <CheckIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Admin;
