import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import "../.././index.css";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useLogout from "../ProtectRoute/useLogout";

export default function Navbar() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    await logout();
    navigate("/");
  };
  return (
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <Link to="/" class="navbar-item">
         Inicio
      </Link>
      

      <a class="navbar-item">
        Suscripción
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Más
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            Beneficios
          </a>
          <a class="navbar-item">
            Sobre LookingPlace
          </a>
          <a class="navbar-item">
            Contacto
          </a>
          <hr class="navbar-divider"/>
          <a class="navbar-item">
            Servicios
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
           

          {
          auth?.email ? (
            <div>
              <a class="button is-primary" to='/register'>
                  <Link to="/createProperty">
                    Publica una propiedad
                  </Link>
              </a>
             <a class="button is-primary" onClick={signOut}>
                Salir
             </a>
            </div>
           ) : (
            <div>
               <a class="button is-primary" to='/register'>
                <Link to="/register">
                  <strong>Registrarse</strong>
                </Link>
               </a>
               <a class="button is-light" to='/login'>
               <Link to="/login">Ingresar</Link>
               </a>
            </div>
           )
    }


        </div>
      </div>
    </div>
  </div>
</nav>
)
}
