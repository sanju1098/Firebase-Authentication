import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(auth.currentUser);
    console.log("Successfully Logged-In 😍");
  } catch (err) {
    console.log(err.code, "Error Code");
    console.log(err.message, "Error Message");
    return [err.code];
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Mail has been Sent ✉️");
    return email;
  } catch (err) {
    console.error(err);
    console.log(err.code, "Error Code");
    console.log(err.message, "Error Message");
    return [err.code];
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(auth.currentUser);
    console.log("Successfully Registered 😍");
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      password, //Optional
    });
  } catch (err) {
    console.error(err);
    console.log(err.code, "Error Code");
    console.log(err.message, "Error Message");
    return [err.code];
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
