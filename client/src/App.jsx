//import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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

import { AuthContextProvider } from "./service/AuthContext";
import { UserAuth } from "./service/AuthContext";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import PaySuccess from "./components/MercadoPago/MPSuccess/MPSuccess";
import PayFailure from "./components/MercadoPago/MPSuccess/MPSuccess";

//import { MyRoutes } from "./components/ProtectRoute/routes";

function App() {
  /*User Google*/

  const RequireAuthGoogle = () => {
    const { user } = UserAuth();
    if (user) {
      return <Outlet />;
    }
  };

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
        <AuthContextProvider>
          {location.pathname !== "/welcome" ? <Navbar /> : null}

          <Routes>
            {/*Public Routes*/}
            <Route path="/layout" element={<Layout />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/" element={<Home />} />
            <Route path="propertyDetail/:id" element={<CardDetail />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="suscribe" element={<Suscribe />} />
            <Route path="/ResumePay" element={<ResumePay />} />

            <Route path="*" element={<Home />} />

            {/*si quieren agregar rutas publicas arriba de este mensaje*/}

            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route element={<WithOutAuth />}></Route>

            {/*Protect routes*/}

            <Route element={<RequireAuth />}>
              <Route path="/Pay/Success" element={<PaySuccess />} />
              <Route path="/Pay/Failure" element={<PayFailure />} />
              <Route path="/settings" element={<Admin />} />
            </Route>

            {/*Tenant Access*/}

            <Route element={<TenantAccess />}>
              <Route path="/createProperty" element={<FormHostCreate />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
export default App;
