//import axios from "../hooks/axios";
import useAuth from "../hooks/useAuth";

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    if (auth.role === "Client") {
      try {
        window.localStorage.clear();
      } catch (err) {
        console.error(err);
      }
    } else if (auth.role === "Tenant" || auth.role === "Admin") {
      try {
        window.localStorage.clear();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return logout;
};

export default useLogout;
