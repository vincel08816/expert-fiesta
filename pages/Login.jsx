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
    <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 600,
          height: 400,
          p: 3,
          m: 10,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="div" sx={{ p: 2 }}>
          Login
        </Typography>
        <Divider sx={{ mb: 3 }} />
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
            padding: "10px",
            marginBottom: "25px",
            fontSize: "16px",
          }}
          onClick={login}
        >
          Login
        </Button>
        <Button onClick={() => router.push({ pathname: "/register" })}>
          Register
        </Button>
      </Paper>
    </Box>
  );
}
