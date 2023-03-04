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

import { auth, registerWithEmailAndPassword } from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { authErrorMessage } from "../helpers";

const Register = () => {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	const [formvalues, setFormvalues] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleOnChange = (e) => {
		setFormvalues({ ...formvalues, [e.target.name]: e.target.value });
	};

	const handleRegister = () => {
		if (formvalues.name.length < 1) {
			setError("Enter the Name");
		} else {
			const result = registerWithEmailAndPassword(
				formvalues.name,
				formvalues.email,
				formvalues.password
			)
				.then((errCodeMes) => {
					console.log(errCodeMes);
					let showErrorMsg = authErrorMessage(errCodeMes[0]);
					setError(showErrorMsg);
				})
				.catch((breaked) => {
					console.log("Something went Wrong. Please refresh😐");
				});
			console.log(result);
		}
	};

	useEffect(() => {
		if (user) navigate("/");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return (
		<div>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography variant="h3"> Sign Up</Typography>

					<Box component="form" noValidate sx={{ mt: 3 }}>
						{error && (
							<Typography color="red" align="center">
								{error}
							</Typography>
						)}
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									name="name"
									value={formvalues.name}
									required
									fullWidth
									id="name"
									label="Name"
									onChange={handleOnChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									fullWidth
									id="email"
									label="Email Address *"
									name="email"
									value={formvalues.email}
									autoComplete="email"
									onChange={handleOnChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									fullWidth
									name="password"
									value={formvalues.password}
									label="Password *"
									type="password"
									id="password"
									autoComplete="password"
									onChange={handleOnChange}
								/>
							</Grid>
						</Grid>

						<Button
							fullWidth
							color="warning"
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleRegister}
						>
							Sign Up
						</Button>

						<Grid container justifyContent="flex-end">
							<Grid item>
								<LinkUI underline="hover">
									<Link
										style={{ color: "#1976d2", textDecoration: "none" }}
										to="/"
									>
										Already have an account? Sign In
									</Link>
								</LinkUI>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default Register;
