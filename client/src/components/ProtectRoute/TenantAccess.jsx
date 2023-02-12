import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../Acceso/hooks/useAuth";

const TenantAccess = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  return auth?.role == "Tenant" || auth.role == "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default TenantAccess;
