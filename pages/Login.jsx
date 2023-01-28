import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const emptyEmailError = "Email cannot be empty.";
const emptyPasswordError = "Password cannot be empty.";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [error, setError] = useState();
  const setUser = useState("setUser");

  useEffect(() => {
    email && setEmailError(email.length > 0 ? "" : emptyEmailError);
    password && setPasswordError(password.length > 0 ? "" : emptyPasswordError);
  }, [email, password]);

  const login = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      setPasswordError(emptyPasswordError);
      return setEmailError(emptyEmailError);
    }
    if (!email) return setEmailError(emptyEmailError);
    if (!password) return setPasswordError(emptyPasswordError);

    try {
      const result = await axios.post("/auth/login", { email, password });
      setUser(result.data);
    } catch (error) {
      setError(
        "Unable to login. Please make sure your email and password are correct then try again."
      );
      console.error(error);
    }
  };

  return (
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
        label="Email Address"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={Boolean(emailError)}
        helperText={emailError}
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
    </Paper>
  );
}
