import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/Acceso/Sign Up/SignUp";
import FormHostCreate from "./components/FormHostCreate/FormHostCreate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/host/create" element={<FormHostCreate />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
}

export default App;
