import axios from "../hooks/axios";
import useAuth from "../hooks/useAuth";

const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    if (auth.role === "Client") {
      try {
        const response = await axios("/client/logout", {
          withCredentials: true,
        });
      } catch (err) {
        console.error(err);
      }
    } else if (auth.role === "Tenant") {
      try {
        const response = await axios("/tenant/logout", {
          withCredentials: true,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return logout;
};

export default useLogout;
