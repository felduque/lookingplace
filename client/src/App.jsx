//import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
//import useAuth from "./components/Acceso/hooks/useAuth";
import { UserAuth } from "./service/AuthContext";

/*Access components*/
import SignUp from "./components/Acceso/Sign Up/SignUp";
import Login from "./components/Acceso/Sign In/Login";
import Admin from "./components/Admin/Admin";
import ForgotPassword from "./components/Acceso/Sign In/ForgotPass";
/*import ResetPassword from "./components/Acceso/Sign In/ResetPassword";*/
import UserDetails from "./components/Acceso/Sign In/userData";

/*Auth Guards*/
//import RequireAuth from "./components/ProtectRoute/RequireAuth";
import WithOutAuth from "./components/ProtectRoute/WithOutAuth";
//import TenantAccess from "./components/ProtectRoute/TenantAccess";
//import { AuthContextProvider } from "./service/AuthContext";

/*Components*/
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/NavBar";
import FormHostCreate from "./components/FormProperty/FormProperty";
import CardDetail from "./components/Detail/CardDetail";
import Suscribe from "./components/Pay/Suscribe";
import AboutUs from "./components/AboutUs/AboutUs";
import ResumePay from "./components/ResumePay/ResumePay";
import PaySuccess from "./components/MercadoPago/MPSuccess/MPSuccess";
import PayFailure from "./components/MercadoPago/MPFailure/MPFailure";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Footer from "././components/Footer/Footer";
import SuscribeSuccess from "./components/Pay/SuscribeSucces.jsx";
import SuscribeFailure from "./components/Pay/SuscribeFailure.jsx";

function App() {
  /*User Google*/

  const { user } = UserAuth();

  /*User Normal*/
  const [auth, setAuth] = useState("");

  const location = useLocation();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  const isLoggedTenant = window.localStorage.getItem("loggedTenant");
  const isLoggedClient = window.localStorage.getItem("loggedClient");
  const isLoggedAdmin = window.localStorage.getItem("loggedAdmin");

  return (
    <div>
      <div>
        <React.Fragment>
          {location.pathname === "/" ? null : <Navbar />}
        </React.Fragment>
        <Routes>
          {/*Public Routes*/}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="propertyDetail/:id" element={<CardDetail />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          
          <Route path="/ResumePay" element={<ResumePay />} />
          <Route path="/Pay/Success" element={<PaySuccess />} />
          <Route path="/Pay/Failure" element={<PayFailure />} />
          <Route path="/Suscription/Success" element={<SuscribeSuccess />} />
          <Route path="/Suscription/Failure" element={<SuscribeFailure />} />

          {/*si quieren agregar rutas publicas arriba de este mensaje*/}

          <Route element={<WithOutAuth />}>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>

          <Route path="/UserDetails" element={<UserDetails />} />
          {/*Protect routes*/}

          <Route
            path="/settings"
            element={
              isLoggedTenant == "true" ||
              isLoggedClient == "true" ||
              isLoggedAdmin == "true" ||
              user ? (
                <Admin />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          {/*Tenant Access*/}
          <Route
            path="/createProperty"
            element={
              isLoggedTenant == "true" || isLoggedAdmin == "true" || user ? (
                <FormHostCreate />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/suscribe"
            element={
              isLoggedTenant == "true" || isLoggedAdmin == "true" ? (
                <Suscribe />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          {/*<Route path="suscribe" element={<Suscribe />} /> */}

          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      {location.pathname === "/settings" ? null : <Footer />}
    </div>
  );
}
export default App;
