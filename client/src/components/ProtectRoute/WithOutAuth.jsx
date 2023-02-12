import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
//import useAuth from "../../apii/useAuth";

const WithOutAuth = ({ isLogued }) => {
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  return auth?.email || isLogued ? <Navigate to="/" /> : <Outlet />;
};

export default WithOutAuth;
