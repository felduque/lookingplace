//import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import 'bulma/css/bulma.min.css';
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
import Suscribe from "./components/Pay/Suscribe.jsx";

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

        {/*Protect routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/settings" element={<Admin />} />
            <Route path="/createProperty" element={<FormHostCreate />} />
          </Route>
          <Route path="/suscribe" element={<Suscribe/>}/>

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
