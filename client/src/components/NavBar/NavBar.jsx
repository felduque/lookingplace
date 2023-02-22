import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import "../.././index.css";
import "./NavBar.css";
import { getTenantById, getUserById } from "../Admin/Api";
import SearchBar from "./SearchBar/SearchBar";
import { UserAuth } from "../../service/AuthContext";
import useLogout from "../Acceso/Sign In/useLogout";
import logoIcon from "../../assets/logo-icon.png";
import userIcon from "../../assets/user-default-icon.png";
import Login from "../Acceso/Sign In/Login";

export default function Navbar() {
  const [auth, setAuth] = useState(null);
  const logout = useLogout();
  const { user, logOut } = UserAuth();
  const [isActive, setIsActive] = useState(false);
  //const navigate = useNavigate();
  const [usersLocal, setUsersLocal] = useState([]);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
      const idClient = storedAuth?.idClient;
      const idTenant = storedAuth?.idTenant;

      if (storedAuth.role === "Client") {
        const usersLocal = await getUserById(idClient);
        setUsersLocal(usersLocal.data);
      } else if (storedAuth.role === "Tenant" || storedAuth.role === "Admin") {
        const usersLocal = await getTenantById(idTenant);
        setUsersLocal(usersLocal.data);
      }
    };
    fetchUsers();
  }, []);

  const signOutGoogle = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    logout();
    await signOutGoogle();
    window.localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <div className="container-global-navbar">
        <nav
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand space-margin-left ">
            <Link to="/home" className="navbar-item">
              <img src={logoIcon} width="30" height="20" />
              <div className="container-logo-name">
                <strong>
                  <span className="name-logo-navbar no-link">LookingPlace</span>
                </strong>
              </div>
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
            <div className="navbar-start suscribe-button">
              <Link to="/suscribe" className="navbar-item">
                Suscripción
              </Link>
            </div>
          </div>

          {location.pathname === "/home" ? <SearchBar /> : null}

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {
                  // Poner ! en auth para testear paneles sin iniciar sesión
                  auth?.role === "Tenant" || auth?.role === "Admin" || user ? (
                    <div className="navbar-item has-dropdown is-hoverable">
                      <a className="navbar-link">
                        {auth?.avatar ? (
                          <figure class="image">
                            <img
                              src={usersLocal?.avatar}
                              className="is-rounded"
                              width="60"
                              height="60"
                            />
                          </figure>
                        ) : user?.photoURL ? (
                          <figure class="image">
                            <img
                              src={user.providerData[0]?.photoURL}
                              className="is-rounded"
                              width="60"
                              height="60"
                            />
                          </figure>
                        ) : (
                          <img src={userIcon} width="30" height="40" />
                        )}
                      </a>

                      <div className="navbar-dropdown is-right">
                        <span className="name-user-navbar">
                        <a className="navbar-item name-user-navbar">
                          <strong>{usersLocal?.fullName || user?.displayName}</strong>
                        </a>
                        </span>
                        <Link to="/createProperty" className="navbar-item">
                          Publicar propiedad
                        </Link>
                        <Link to="/settings" className="navbar-item">
                          Mi Cuenta/Perfil
                        </Link>
                        <hr className="navbar-divider" />
                        <a className="navbar-item" onClick={signOut}>
                          Salir
                        </a>
                      </div>
                    </div>
                  ) : auth?.role === "Client" ? (
                    <div className="navbar-item has-dropdown is-hoverable">
                      <a className="navbar-link">
                        {auth?.avatar ? (
                          <figure class="image">
                            <img
                              src={usersLocal?.avatar}
                              className="is-rounded"
                              width="60"
                              height="60"
                            />
                          </figure>
                        ) : user?.photoURL ? (
                          <figure class="image">
                            <img
                              src={user.providerData[0]?.photoURL}
                              className="is-rounded"
                              width="60"
                              height="60"
                            />
                          </figure>
                        ) : (
                          <img src={userIcon} width="30" height="40" />
                        )}
                      </a>

                      <div className="navbar-dropdown is-right">
                        <span className="name-user-navbar">
                           <a className="navbar-item name-user-navbar">
                            <strong>{usersLocal?.fullName || user?.displayName}</strong>
                          </a>
                        </span>
                        <Link to="/settings" className="navbar-item">
                          Mi Cuenta/Perfil
                        </Link>
                        <hr className="navbar-divider" />
                        <a className="navbar-item" onClick={signOut}>
                          Salir
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Link
                        to="/createProperty"
                        className="button is-link is-outlined"
                      >
                        Publicar propiedad
                      </Link>
                      <button
                        className="button is-info is-outlined"
                        onClick={() => setIsActive(true)}
                      >
                        Ingresar
                      </button>
                      {isActive && (
                        <Login closeModal={() => setIsActive(false)} />
                      )}
                      <Link to="/register" className="button is-primary">
                        <strong>Registrarse</strong>
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
