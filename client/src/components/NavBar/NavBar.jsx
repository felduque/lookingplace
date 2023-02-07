import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
//import "../.././index.css";
import "./NavBar.css";

import useLogout from "../Acceso/Sign In/useLogout";
import mapIcon from "../../assets/icon-map.png";
import userIcon from "../../assets/user-default-icon.png";

export default function Navbar() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
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
    navigate(from, { replace: true });
    window.location.reload();
  };
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div
        className="navbar-brand space-margin-left
"
      >
        <Link to="" className="navbar-item">
          <strong>LookingPlace</strong>
          <img src={mapIcon} width="30" height="20" />
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
          <a className="navbar-item">
            <Link to="/suscribe">Suscripción</Link>
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                // Poner ! en auth para testear paneles sin iniciar sesión
                auth ? (
                  <div
                    className="navbar-item has-dropdown is-hoverable space-margin-right
          "
                  >
                    <a className="navbar-link">
                      <img src={userIcon} width="30" height="40" />
                    </a>

                    <div className="navbar-dropdown">
                      <a className="navbar-item">Mi perfil</a>
                      <a className="navbar-item">
                        <Link to="/createProperty">Publicar propiedad</Link>
                      </a>
                      <a className="navbar-item">
                        <Link to="/settings">Dashboard</Link>
                      </a>
                      <a className="navbar-item">Favoritos</a>
                      <hr className="navbar-divider" />
                      <a className="navbar-item" onClick={signOut}>
                        Salir
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <a className="button is-primary" to="/register">
                      <Link to="/register">
                        <strong>Registrarse</strong>
                      </Link>
                    </a>
                    <a className="button is-light" to="/login">
                      <Link to="/login">Ingresar</Link>
                    </a>
                    <a className="button is-light" to="/createProperty">
                      <Link to="/createProperty">Publicar propiedad</Link>
                    </a>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
