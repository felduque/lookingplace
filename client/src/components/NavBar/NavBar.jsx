import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import "../.././index.css";
import "./NavBar.css";

import SearchBar from "./SearchBar/SearchBar";

import useLogout from "../Acceso/Sign In/useLogout";
import logoIcon from "../../assets/logo-icon.png";
import userIcon from "../../assets/user-default-icon.png";

export default function Navbar({ isLogued }) {
  const [auth, setAuth] = useState(null);
  const logout = useLogout();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  const signOut = async () => {
    await logout();
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    window.location.reload();
    setAuth(null);
  };
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand space-margin-left">
        <Link to="/" className="navbar-item">
          <img src={logoIcon} width="30" height="20" />
          <strong>LookingPlace</strong>
        </Link>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/suscribe" className="navbar-item">
            Suscripción
          </Link>
        </div>
      </div>

      {location.pathname === "/" ? <SearchBar /> : null}

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {
              // Poner ! en auth para testear paneles sin iniciar sesión
              auth || isLogued.email ? (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                    <img src={userIcon} width="30" height="40" />
                  </a>

                  <div className="navbar-dropdown is-right">
                    <Link to="/createProperty" className="navbar-item">
                      Publicar propiedad
                    </Link>
                    <Link to="/settings" className="navbar-item">
                      Dashboard
                    </Link>
                    <hr className="navbar-divider" />
                    <a className="navbar-item" onClick={signOut}>
                      Salir
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <Link to="/register" className="button is-primary">
                    <strong>Registrarse</strong>
                  </Link>
                  <Link to="/login" className="button is-info is-outlined">
                    Ingresar
                  </Link>
                  <Link
                    to="/createProperty"
                    className="button is-link is-outlined"
                  >
                    Publicar propiedad
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
