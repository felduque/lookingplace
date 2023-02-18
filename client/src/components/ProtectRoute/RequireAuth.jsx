import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Acceso/hooks/useAuth";
import { UserAuth } from "../../service/AuthContext";

const RequireAuth = () => {
  const { auth } = useAuth();
  const { user } = UserAuth();
  const location = useLocation();

  return auth?.email || user?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
