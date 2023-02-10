//import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/Acceso/Sign Up/SignUp";
import Login from "./components/Acceso/Sign In/Login";
import Admin from "./components/Admin/Admin";
import Navbar from "./components/NavBar/NavBar";
import RequireAuth from "./components/ProtectRoute/RequireAuth";
import WithOutAuth from "./components/ProtectRoute/WithOutAuth";
import Layout from "./components/ProtectRoute/Layout";
import FormHostCreate from "./components/FormProperty/FormProperty";
import CardDetail from "./components/Detail/CardDetail";
import Suscribe from "./components/Pay/Suscribe";
import Footer from "./components/Footer/Footer";
import ForgotPassword from "./components/Acceso/Sign In/ForgotPass";
//import ResetPassword from "./components/Acceso/Sign In/ResetPassword";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);
  return (
    <div>
      <div>
        <Navbar isLogued={user} />
        <Routes>
          {/*Public Routes*/}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="propertyDetail/:id" element={<CardDetail />} />

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
                <Route path="createProperty" element={<FormHostCreate />} />
                <Route path="settings" element={<Admin />} />
              </Route>
            ) : (
              <Route element={<RequireAuth />}>
                <Route path="createProperty" element={<FormHostCreate />} />
                <Route path="settings" element={<Admin />} />
              </Route>
            )}

            <Route element={<RequireAuth />}>
              <Route path="createProperty" element={<FormHostCreate />} />
              <Route path="settings" element={<Admin />} />
            </Route>
            <Route path="suscribe" element={<Suscribe />} />
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
