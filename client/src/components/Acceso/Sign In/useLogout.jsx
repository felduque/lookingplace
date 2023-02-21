import { useNavigate } from "react-router-dom";
import axios from "../hooks/axios";
import useAuth from "../hooks/useAuth";

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});

    if (auth.role === "Client") {
      try {
        const response = await axios("/client/logout", {
          withCredentials: true,
        });
        window.localStorage.clear();
        navigate("/home");
      } catch (err) {
        console.error(err);
      }
    } else if (auth.role === "Tenant") {
      try {
        const response = await axios("/tenant/logout", {
          withCredentials: true,
        });
        window.localStorage.clear();
        navigate("/home");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return logout;
};

export default useLogout;
