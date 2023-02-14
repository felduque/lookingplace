import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnh0EaclDpC-EFIbMv8mqUiVqS5P2HhmU",
  authDomain: "loginlooking-6d878.firebaseapp.com",
  projectId: "loginlooking-6d878",
  storageBucket: "loginlooking-6d878.appspot.com",
  messagingSenderId: "484869019679",
  appId: "1:484869019679:web:e23f6955528412928c1d2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
