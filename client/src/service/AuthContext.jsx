import React from "react";
import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  //signInWithPopup
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebase.config";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const logOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Almacenar la información del usuario en la colección "users"
      if (currentUser) {
        const userRef = doc(db, "usuarios", currentUser.uid);
        setDoc(userRef, {
          name: currentUser.displayName, //doc y set doc me sirve para guardar la informacion en la db
          email: currentUser.email,
        })
          .then(() => {
            console.log("Usuario registrado en Cloud Firestore");
          })
          .catch((error) => {
            console.error(
              "Error al registrar usuario en Cloud Firestore: ",
              error
            );
          });
      }
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
