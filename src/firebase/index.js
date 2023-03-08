import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	updateProfile,
} from "firebase/auth";

import {
	getFirestore,
	collection,
	addDoc,
	query,
	where,
	getDocs,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login with UserName and Password
const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		// console.log(auth.currentUser);
		console.log("Successfully Logged-In 😍");
	} catch (err) {
		// console.log(err.code, "Error Code");
		console.log(err.message, "Error Message");
		return [err.code];
	}
};

// Login with Google Account
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		// console.log(err.code, "Error Code");
		console.log(err.message, "Error Message");
		return [err.code];
	}
};

// Send Reset Password Link
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		console.log("Mail has been Sent ✉️");
		return email;
	} catch (err) {
		console.error(err);
		// console.log(err.code, "Error Code");
		console.log(err.message, "Error Message");
		return [err.code];
	}
};

// Register/Sign in New Account
const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		// console.log(auth.currentUser);
		console.log("Successfully Registered 😍");
		await updateProfile(user, {
			displayName: name,
		});
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			password, //Optional
		});
	} catch (err) {
		console.error(err);
		// console.log(err.code, "Error Code");
		console.log(err.message, "Error Message");
		return [err.code];
	}
};

//Logout Account
const logout = () => {
	signOut(auth);
};

export {
	auth,
	db,
	logInWithEmailAndPassword,
	signInWithGoogle,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
};
