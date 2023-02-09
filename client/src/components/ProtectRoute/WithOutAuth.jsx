import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
//import useAuth from "../../apii/useAuth";

const WithOutAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  return auth?.email ? <Navigate to="/" /> : <Outlet />;
};

export default WithOutAuth;
