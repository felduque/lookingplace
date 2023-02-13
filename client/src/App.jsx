//import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useAuth from "./components/Acceso/hooks/useAuth";

/*Access components*/
import SignUp from "./components/Acceso/Sign Up/SignUp";
import Login from "./components/Acceso/Sign In/Login";
import Admin from "./components/Admin/Admin";
import ForgotPassword from "./components/Acceso/Sign In/ForgotPass";
/*import ResetPassword from "./components/Acceso/Sign In/ResetPassword";*/

/*Auth Guards*/
import RequireAuth from "./components/ProtectRoute/RequireAuth";
import WithOutAuth from "./components/ProtectRoute/WithOutAuth";
import TenantAccess from "./components/ProtectRoute/TenantAccess";
import Layout from "./components/ProtectRoute/Layout";

/*Components*/
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/NavBar";
import FormHostCreate from "./components/FormProperty/FormProperty";
import CardDetail from "./components/Detail/CardDetail";
import Suscribe from "./components/Pay/Suscribe";
import Footer from "./components/Footer/Footer";
import AboutUs from "./components/AboutUs/AboutUs";
import ResumePay from "./components/ResumePay/ResumePay";

function App() {
  /*User Google*/
  const [user, setUser] = useState({});

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  /*User Normal*/
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  return (
    <div>
      <div>
        <Navbar isLogued={user} />
        <Routes>
          {/*Public Routes*/}
          <Route path="/layout" element={<Layout />} />
          <Route path="/" element={<Home />} />
          <Route path="propertyDetail/:id" element={<CardDetail />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="suscribe" element={<Suscribe />} />
          <Route path="/ResumePay" element={<ResumePay />} />
          <Route path="*" element={<Home />} />

          {/*si quieren agregar rutas publicas arriba de este mensaje*/}

          {user.email ? (
            <Route element={<WithOutAuth isLogued={user} />}>
              <Route path="register" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Route>
          ) : (
            <Route element={<WithOutAuth />}>
              <Route path="register" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Route>
          )}

          {/*Protect routes*/}

          {user.email ? (
            <Route element={<RequireAuth isLogued={user} />}>
              <Route path="settings" element={<Admin />} />
            </Route>
          ) : (
            <Route element={<RequireAuth />}>
              <Route path="settings" element={<Admin />} />
            </Route>
          )}

          {/*Tenant Access*/}

          <Route element={<TenantAccess />}>
            <Route path="/createProperty" element={<FormHostCreate />} />
          </Route>
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
