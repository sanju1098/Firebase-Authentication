import React, { useEffect, useState } from "react";
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
import { auth, db } from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

const Dashboard = () => {
	const [user, loading, error] = useAuthState(auth);

	const [name, setName] = useState("");
	const [userInfo, setUserInfo] = useState([]);

	const navigate = useNavigate();

	const fetchUserName = async () => {
		try {
			const q = query(collection(db, "users"), where("uid", "==", user?.uid));
			const doc = await getDocs(q);
			const data = doc.docs[0].data();
			setUserInfo(data);
			setName(data.name);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (!user) return navigate("/");
		fetchUserName();
	}, [user, loading]);

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
								{userInfo.email ? (
									<>
										<Typography
											sx={{ fontSize: 18 }}
											color="text.secondary"
											gutterBottom
										>
											Successfully Logged-In 😍🤩:
										</Typography>
										<Typography sx={{ fontFamily: "Georgia" }} variant="h5">
											{name}
										</Typography>
										<Typography sx={{ fontFamily: "Georgia" }} variant="h5">
											{userInfo.email}
										</Typography>
									</>
								) : (
									<Typography sx={{ fontFamily: "Georgia" }} variant="h3">
										Fetching Your Details...
									</Typography>
								)}
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
