import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
//import useAuth from "../../apii/useAuth";
import { UserAuth } from "../../service/AuthContext";
const WithOutAuth = ({ isLogued }) => {
  const [auth, setAuth] = useState("");
  const { user } = UserAuth();
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  return auth?.email || user ? <Navigate to="/" /> : <Outlet />;
};

export default WithOutAuth;
