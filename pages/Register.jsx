import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const [error, setError] = useState();
  const router = useRouter();

  const [formState, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "text":
        return {
          ...state,
          [action.field]: { ...state[action.field], value: action.value },
        };
      case "error":
        if (state[action.field]?.error === action.value) return state;
        return {
          ...state,
          [action.field]: { ...state[action.field], error: action.value },
        };
      default:
        throw Error("Unexpected action type");
    }
  }, {});

  const { username, password, confirmPassword, message } = formState;

  const handleChange = (e) => {
    setError();
    dispatch({ type: "text", field: e.target.name, value: e.target.value });
  };

  const validate = useCallback(() => {
    let { username, password, confirmPassword } = formState;

    const validity = {
      username: {
        check: () => username?.value?.length,
        error: "You must have a username",
      },
      password: {
        check: () =>
          password?.value?.length >= 8 &&
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/.test(
            password?.value
          ),
        error:
          "Please enter a password at least 8 character and contain at least a uppercase, lowercase, and number",
      },
      confirmPassword: {
        check: () => password?.value === confirmPassword?.value,
        error: "Passwords do not match",
      },
    };

    for (let userProperty in validity) {
      if (formState[userProperty]?.value) {
        dispatch({
          type: "error",
          field: userProperty,
          value: validity[userProperty].check()
            ? ""
            : validity[userProperty].error,
        });
      }
    }

    return (
      !error &&
      formState.username &&
      formState.password?.value &&
      formState.password?.value === formState.confirmPassword?.value
    );
  }, [error, formState]);

  useEffect(() => {
    validate();
  }, [formState, validate]);

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
          width: 400,
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
          Sign Up
        </Typography>
        {/* <Divider sx={{ mb: 3 }} /> */}
        <Typography variant="caption" component="div" sx={{ pb: 3 }}>
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
          onChange={handleChange}
          value={username?.value ?? ""}
          error={Boolean(username?.error)}
          helperText={username?.error}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Password"
          name="password"
          onChange={handleChange}
          value={password?.value ?? ""}
          error={Boolean(password?.error)}
          helperText={password?.error}
          type="password"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword?.value ?? ""}
          error={Boolean(confirmPassword?.error)}
          helperText={confirmPassword?.error}
          type="password"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Write a short description"
          name="message"
          onChange={handleChange}
          value={message?.value ?? ""}
          type="text"
          style={{ marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          sx={{
            padding: "15px 10px",
            marginBottom: "25px",
            fontSize: "16px",
            borderRadius: "50px",
            fontSize: "14px",
          }}
          onClick={async () => {
            if (!validate()) return;
            try {
              console.log(formState);
              await axios.post("/api/user/signup", {
                username: username.value,
                password: password.value,
                why: message.value,
              });
              Swal.fire({
                icon: "success",
                title:
                  "🎉 Congratulations! You have successfully signed up! 🎉",
                text: "Please contact me about verification!",
              });
            } catch (err) {
              console.error(err);
              Swal.fire({
                icon: "error",
                title: "Could not create an account 🥲",
                text: "Maybe you already have an account or try again later",
              });
            }
          }}
        >
          Sign Up
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
          onClick={() => router.push({ pathname: "/login" })}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
