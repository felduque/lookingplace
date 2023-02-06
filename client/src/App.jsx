import "./App.css";
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
import PersistLogin from "./components/Acceso/Sign In/PersistLogin";
import PaymentStripe from "./components/Pay/PaymentStripe.jsx";
import CardDetail from "./components/Detail/CardDetail";
import ButtonMP from "./components/Pay/BotonPrueba";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        {/*Public Routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/propertyDetail/:id" element={<CardDetail />} />
        <Route path="/botonMP" element={<ButtonMP />} />
        <Route path="/createProperty" element={<FormHostCreate />} />

        {/*Protect routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/settings" element={<Admin />} />
          </Route>
          <Route path="/suscribe" element={<PaymentStripe />} />

          {/*Protect routes*/}
          <Route element={<RequireAuth />}>
            <Route path="/settings" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
