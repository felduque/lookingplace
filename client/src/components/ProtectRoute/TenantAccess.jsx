/*import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../Acceso/hooks/useAuth";
import imageDialog from "../../assets/map-publish.png";
import Swal from "sweetalert2";
import { UserAuth } from "../../service/AuthContext";
const TenantAccess = () => {
  const { auth, setAuth } = useAuth();
  const { user } = UserAuth();
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  return auth?.role == "Tenant" || auth?.role == "Admin" || user?.email ? (
    <Outlet />
  ) : (
    (Swal.fire({
      title: "Regístrate para ser parte de la aventura",
      text: 'Regístrate con la opción "Ofrezco hospedaje" para publicar una propiedad',
      imageUrl: imageDialog,
      imageWidth: 200,
      imageHeight: 180,
      confirmButtonText: "Entendido",
      position: "top-end",
    }),
    (<Navigate to="/register" />))
  );
};

export default TenantAccess;*/
