import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link as LinkUI,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
// import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [formvalues, setFormvalues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    setFormvalues({ ...formvalues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const result = logInWithEmailAndPassword(
      formvalues.email,
      formvalues.password
    )
      .then((errCodeMes) => {
        console.log(errCodeMes);
        setError(errCodeMes);
      })
      .catch((breaked) => {
        console.log("Something went Wrong. Please refresh😐");
      });
    console.log(result);
  };

  // const onHandleLogin = (e) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(auth, formvalues.email, formvalues.password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       navigate("/dashboard");
  //       console.log("Successfully Logged-In 😍", user);
  //     })
  //     .catch((error) => {
  //       console.log(error.code, error.message);
  //       setError(error.code);
  //     });
  // };

  useEffect(() => {
    if (user) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Login</Typography>

          <Box component="form" sx={{ m: 1 }}>
            {error && (
              <Typography variant="h6" color="red" align="center">
                {error}
              </Typography>
            )}
            <TextField
              type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              value={formvalues.email}
              label="Email Address"
              autoComplete="email"
              onChange={handleOnChange}
            />

            <TextField
              margin="normal"
              type="password"
              required
              fullWidth
              id="password"
              name="password"
              value={formvalues.password}
              label="Password"
              autoComplete="password"
              onChange={handleOnChange}
            />

            <Grid container justifyContent="flex-start">
              <Grid item>
                <LinkUI underline="hover">
                  <Link
                    style={{ color: "#1976d2", textDecoration: "none" }}
                    to="/reset-password"
                  >
                    Forgot Password?
                  </Link>
                </LinkUI>
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkUI underline="hover">
                  <Link
                    style={{ color: "#1976d2", textDecoration: "none" }}
                    to="/register"
                  >
                    Don't have an account? Sign Up
                  </Link>
                </LinkUI>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
