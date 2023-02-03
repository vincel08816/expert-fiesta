import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";

const emptyUsernameError = "Username cannot be empty.";
const emptyPasswordError = "Password cannot be empty.";

export default function Login() {
  const { user, setUser } = useAppContext();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [error, setError] = useState();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  useEffect(() => {
    username && setUsernameError(username.length > 0 ? "" : emptyUsernameError);
    password && setPasswordError(password.length > 0 ? "" : emptyPasswordError);
  }, [username, password]);

  const login = async (e) => {
    e.preventDefault();
    if (!username && !password) {
      setPasswordError(emptyPasswordError);
      return setUsernameError(emptyUsernameError);
    }
    if (!username) return setUsernameError(emptyUsernameError);
    if (!password) return setPasswordError(emptyPasswordError);

    try {
      const result = await axios.post("/api/auth/login", {
        username,
        password,
      });
      setUser(result.data);
    } catch (error) {
      setError(
        "Unable to login. Please make sure your username and password are correct then try again."
      );
      console.error(error);
    }
  };

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
      <Box
        sx={{
          top: 25,
          left: 50,
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          display: "none",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Menhera
        </Typography>
        <Box sx={{ ml: 0.1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              backgroundColor: "black",
              color: "white",
              p: 0.2,
              borderRadius: 1,
            }}
          >
            GPT
          </Typography>
        </Box>
      </Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          width: 400,
          p: 3,
          m: 10,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ pt: 2, pb: 1, fontWeight: 600 }}
        >
          Login
        </Typography>
        {/* <Divider sx={{ mb: 3 }} /> */}
        <Typography variant="caption" sx={{ pb: 3 }}>
          Welcome to all the answers to your questions!
        </Typography>
        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ margin: "-10px 0 30px 10px" }}
          >
            {error}
          </Typography>
        )}

        <TextField
          label="Username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          error={Boolean(usernameError)}
          helperText={usernameError}
        />
        <TextField
          label="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={Boolean(passwordError)}
          helperText={passwordError}
          type="password"
          style={{ margin: "20px 0" }}
        />
        <Button
          variant="contained"
          sx={{
            padding: "15px 10px",
            marginBottom: "25px",
            borderRadius: "50px",
            fontSize: "14px",
          }}
          onClick={login}
        >
          Login
        </Button>
        <Divider sx={{ fontSize: "15px", mb: 2 }}>or</Divider>

        <Button
          variant="outlined"
          sx={{
            padding: "15px 10px",
            marginBottom: "25px",
            borderRadius: "50px",
            fontSize: "14px",
          }}
          onClick={() => router.push({ pathname: "/register" })}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
}
