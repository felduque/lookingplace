//import "./App.css";
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
import ResetPassword from "./components/Acceso/Sign In/ResetPassword";

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <Routes>
          {/*Public Routes*/}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="propertyDetail/:id" element={<CardDetail />} />

            <Route element={<WithOutAuth />}>
              <Route path="register" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/reset" element={<ResetPassword />} />
            </Route>

            {/*Protect routes*/}

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
