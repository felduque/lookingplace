import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../.././index.css";
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
    <nav className="navbar is-info">
      <div className="navbar-brand">
        <li className="navbar-item">
          <Link to="/">
            <h1>
              <button>Home</button>
            </h1>
          </Link>
        </li>
        <li className="navbar-item">
          <h1 className="title is-3">LookingPlace</h1>
        </li>
      </div>

      {auth?.email ? (
        <div className="navbar-end">
          <div className="navbar-item">
            <button onClick={signOut}>Logout</button>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <li className="button is-primary is-inverted">
                <Link to="/register">
                  <>Register</>
                </Link>
              </li>
              <li className="button is-info is-inverted">
                <Link to="/login">Login</Link>
              </li>
            </div>
          </div>
        </div>
      )}
      {auth?.email ? (
        <div className="navbar-end">
          <div className="navbar-item">
            <li className="button is-primary is-inverted">
              <Link to="/createProperty">Publica una propiedad</Link>
            </li>
          </div>
        </div>
      ) : (
        <div className="navbar-item">
          <li className="button is-primary is-inverted">
            <Link to="/createProperty">Publica una propiedad</Link>
          </li>
        </div>
      )}
    </nav>
  );
}
