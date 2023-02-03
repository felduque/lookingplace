import { useContext, useDebugValue } from "react";
import AuthContext from "../components/context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.email ? "Logged In" : "Logged Out"));
  return useContext(AuthContext);
};

export default useAuth;
