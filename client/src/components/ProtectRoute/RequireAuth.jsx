import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Acceso/hooks/useAuth";

const RequireAuth = ({ isLogued }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.email || isLogued ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
