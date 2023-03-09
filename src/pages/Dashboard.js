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
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

const Dashboard = () => {
	const [user, loading, error] = useAuthState(auth);

	const [name, setName] = useState("");
	const [userInfo, setUserInfo] = useState([]);
	const [showUid, setShowUID] = useState(false);

	const navigate = useNavigate();

	const fetchUserName = async () => {
		try {
			const q = query(collection(db, "users"), where("uid", "==", user?.uid));
			const doc = await getDocs(q);
			const data = doc.docs[0].data();
			setUserInfo(data);
			setName(data.name);
		} catch (err) {
			// console.error(err);
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
				// console.log(error);
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
								{userInfo.email ? (
									<>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<CheckCircleOutlineRoundedIcon
												fontSize="large"
												color="success"
											/>
											{userInfo.authProvider === "google" ? (
												<GoogleIcon fontSize="large" color="success" />
											) : (
												<MarkEmailReadIcon fontSize="large" color="success" />
											)}
										</div>
										<Typography
											sx={{ fontSize: 18 }}
											color="text.secondary"
											gutterBottom
										>
											Successfully Logged-In 😍🤩:
										</Typography>
										<Typography sx={{ fontFamily: "Georgia" }} variant="h4">
											{name.toUpperCase()}
										</Typography>
										<Typography sx={{ fontFamily: "Georgia" }} variant="h5">
											Email: {userInfo.email}
										</Typography>
										<Typography sx={{ fontFamily: "Georgia" }} variant="h6">
											UID:{" "}
											{showUid ? (
												<>
													<VisibilityOffIcon
														sx={{ color: "grey" }}
														onClick={() => setShowUID(!showUid)}
													/>{" "}
													{userInfo.uid}
												</>
											) : (
												<>
													<VisibilityIcon
														sx={{ color: "grey" }}
														onClick={() => setShowUID(!showUid)}
													/>{" "}
													...................................
												</>
											)}
										</Typography>
									</>
								) : (
									<Typography sx={{ fontFamily: "Georgia" }} variant="h3">
										Loading Details...
									</Typography>
								)}
							</CardContent>
						</Card>

						<Button
							disabled={!userInfo.email}
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
