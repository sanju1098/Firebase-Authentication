import React, { useEffect, useState } from "react";
import {
	Container,
	Box,
	Typography,
	TextField,
	Button,
	Grid,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "../firebase/index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { authErrorMessage } from "../helpers";

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate("/dashboard");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const handleResetPassword = () => {
		const result = sendPasswordReset(email)
			.then((errCodeMes) => {
				if (errCodeMes === email) {
					setError("Reset Password Link sent to email");
				} else {
					let showErrorMsg = authErrorMessage(errCodeMes[0]);
					setError(showErrorMsg);
				}
			})
			.catch((breaked) => {});
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography variant="h3">Reset Password</Typography>

				<Box component="form" noValidate sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							{error === "Reset Password Link sent to email" ? (
								<Typography color="green" align="center">
									{error}
								</Typography>
							) : (
								<Typography variant="h6" color="red" align="center">
									{error}
								</Typography>
							)}
							<br />
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
					</Grid>

					<Button
						color="warning"
						fullWidth
						variant="contained"
						sx={{ mt: 2 }}
						endIcon={<MailOutlineIcon />}
						onClick={handleResetPassword}
					>
						Send Reset Password Link to Mail
					</Button>

					<Link style={{ color: "#ffffff", textDecoration: "none" }} to="/">
						<Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Go to Login Page
						</Button>
					</Link>
				</Box>
			</Box>
		</Container>
	);
};

export default ResetPassword;
