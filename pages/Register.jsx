import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Router } from "next/router";
import React, { useCallback, useEffect, useReducer, useState } from "react";

export default function Register() {
  const [error, setError] = useState();

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

  const { username, email, password, confirmPassword } = formState;

  const handleChange = (e) => {
    setError();
    dispatch({ type: "text", field: e.target.name, value: e.target.value });
  };

  const validate = useCallback(() => {
    let { username, email, password, confirmPassword } = formState;

    const validity = {
      username: {
        check: () => username?.value?.length,
        error: "You must have a username",
      },
      email: {
        check: () => /\S+@\S+\.\S+/.test(email?.value),
        error: "Invalid email address",
      },
      password: {
        check: () =>
          password?.value?.length >= 8 &&
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/.test(
            password?.value
          ),
        error:
          "Please enter a password at least 8 character and contain at least a uppercase, lowercase, and a special character.",
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
      formState.email &&
      formState.password?.value &&
      formState.password?.value === formState.confirmPassword?.value
    );
  }, [error, formState]);

  useEffect(() => {
    validate();
  }, [formState, validate]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 600,
        p: 3,
        m: 10,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="div" sx={{ p: 2 }}>
        Create an Account!
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
        onChange={handleChange}
        value={username?.value ?? ""}
        error={Boolean(username?.error)}
        helperText={username?.error}
        style={{ marginBottom: "20px" }}
      />
      <TextField
        label="Email Address"
        name="email"
        onChange={handleChange}
        value={email?.value ?? ""}
        error={Boolean(email?.error)}
        helperText={email?.error}
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
      <Button
        variant="contained"
        style={{
          padding: "10px",
          marginBottom: "25px",
        }}
        onClick={async () => {
          if (!validate()) return;
          try {
            console.log(formState);
            await axios.post("/auth/signup", {
              username: username.value,
              email: email.value,
              password: password.value,
            });
            Router.push({ pathname: "/login" });
          } catch (err) {
            console.error(err);
            alert("Unable to register. Please try again.");
            return;
          }
        }}
      >
        Sign Up
      </Button>
    </Paper>
  );
}
