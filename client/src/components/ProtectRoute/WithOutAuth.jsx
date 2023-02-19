import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../Acceso/hooks/useAuth";
import { UserAuth } from "../../service/AuthContext";
const WithOutAuth = () => {
  const { auth, setAuth } = useAuth();
  const { user } = UserAuth();
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  return auth?.email || user?.email ? <Navigate to="/home" /> : <Outlet />;
};

export default WithOutAuth;
