//import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/Acceso/Sign Up/SignUp";
import Login from "./components/Acceso/Sign In/Login";
import Admin from "./components/Admin/Admin";
import Navbar from "./components/NavBar/NavBar";
import RequireAuth from "./components/ProtectRoute/RequireAuth";
import { Outlet } from "react-router-dom";
import Layout from "./components/ProtectRoute/Layout";
import FormHostCreate from "./components/FormProperty/FormProperty";
import CardDetail from "./components/Detail/CardDetail";
import PersistLogin from "./components/Acceso/Sign In/PersistLogin";
import Suscribe from "./components/Pay/Suscribe";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <Routes>
          <Route path="/layout" element={<Layout />} />
          <Route path="/settings" element={<Admin />} />
          {/*Public Routes*/}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createProperty" element={<FormHostCreate />} />
          <Route path="/propertyDetail/:id" element={<CardDetail />} />

          {/*Protect routes*/}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/settings" element={<Admin />} />
            </Route>
            <Route path="/suscribe" element={<Suscribe />} />

            {/*Protect routes*/}
            {/* <Route element={<RequireAuth />}>
            </Route> */}
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
