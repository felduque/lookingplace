import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import "../.././index.css";
import "./NavBar.css";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useLogout from "../ProtectRoute/useLogout";
import mapIcon from '../../assets/icon-map.png';
import userIcon from '../../assets/user-default-icon.png';

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
  <div class="navbar-brand space-margin-left
">
  <Link to="" class="navbar-item">
    <strong>LookingPlace</strong>
  <img src={mapIcon} width="30" height="20"/>
  </Link>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">

      <a class="navbar-item">
        <Link to="/suscribe">
          Suscripción
        </Link>
      </a>

    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
           

          {
            // Poner ! en auth para testear paneles sin iniciar sesión
          auth?.email ? (
          <div class="navbar-item has-dropdown is-hoverable space-margin-right
          ">
              <a class="navbar-link">
                 <img src={userIcon} width='30' height='40' />
              </a>

            <div class="navbar-dropdown">
               <a class="navbar-item">
                 Mi perfil
               </a>
               <a class="navbar-item">
                 <Link to="/createProperty">
                   Publicar propiedad
                 </Link>
               </a>
               <a class="navbar-item">
                 Favoritos
               </a>
               <hr class="navbar-divider"/>
               <a class="navbar-item" onClick={signOut}>
                 Salir
               </a>
            </div>
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
