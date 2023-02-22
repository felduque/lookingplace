import { createContext, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("auth"));
    setAuth(data);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
