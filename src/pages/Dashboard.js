import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/index";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Successfully Logged-Out 😍");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          mt: 10,
        }}
      >
        <Container component="main" sx={{ mt: 2, mb: 0 }} maxWidth="sm">
          <Box>
            <Card variant="outlined">
              <CardContent>
                <CheckCircleOutlineRoundedIcon
                  fontSize="large"
                  color="success"
                />
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Successfully Logged-In 😍🤩:
                </Typography>

                {/* <Typography sx={{ fontFamily: "Georgia" }} variant="h5">
                  Name
                </Typography>
                <Typography sx={{ fontFamily: "Georgia" }}>Email</Typography>
                <Typography sx={{ fontFamily: "Georgia" }}>UID</Typography>
                <Typography sx={{ fontFamily: "Georgia" }}>LoggedIn</Typography> */}
              </CardContent>
            </Card>
            <Button
              // disabled
              fullWidth
              variant="contained"
              sx={{ mt: 1 }}
              color="secondary"
              endIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Dashboard;
