import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";

const emptyUsernameError = "Username cannot be empty.";
const emptyPasswordError = "Password cannot be empty.";

export default function Login() {
  const user = useSelector((state) => state.user?.user);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [error, setError] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSetUser = (payload) => dispatch(setUser(payload));

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
      handleSetUser(result.data);
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
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f2ee",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "10px",
          width: 350,
          p: 3,
          boxShadow: 3,
          m: 1,
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
            padding: "15px",
            marginBottom: "25px",
            borderRadius: "50px",
            fontSize: "14px",
          }}
          onClick={() => router.push({ pathname: "/register" })}
          children="Register"
        />
      </Paper>
    </Box>
  );
}
