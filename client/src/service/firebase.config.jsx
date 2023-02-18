import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9CZ56NluoNE0o-co-6BDxS9NsplGMsiU",
  authDomain: "davidlogin-1dc14.firebaseapp.com",
  projectId: "davidlogin-1dc14",
  storageBucket: "davidlogin-1dc14.appspot.com",
  messagingSenderId: "914876312083",
  appId: "1:914876312083:web:8510a40b9fa83c359bade6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
