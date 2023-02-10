import React from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import usermailIcon from "../../../assets/usermail-login.png";
import leftarrow from "../../../assets/flecha-izquierda.png";
import "./Login.css";
import axios from "../hooks/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.includes("@")) {
      setErrorMessage("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    try {
      const response = await axios.post("/client/forgot", { email });
      setSuccessMessage(
        "Un correo con las instrucciones para recuperar su contraseña ha sido enviado a su buzón. Si no lo encuentra revise en la carpeta spam."
      );
    } catch (error) {
      setErrorMessage(
        "Hubo un problema al enviar el correo electrónico de recuperación de contraseña, intentalo más tarde"
      );
    }

    // acá debería enviar una solicitud a la API para enviar el correo electrónico de recuperación de contraseña
  }

  function back() {
    navigate(from, { replace: true });
  }

  return (
    <>
      <div className="hoverimg">
        <img src={leftarrow} alt="" className="btnBackLogin" onClick={back} />
      </div>
      <div className="container-page-login">
        <div className="container-login">
          <div className="form-container-login">
            <section>
              <div className="ForgotPassError">{errorMessage}</div>
              <div className="ForgotPassSuccess">{successMessage}</div>
              <div class="title is-4 is-spaced">Recuperar contraseña</div>
              <form onSubmit={handleSubmit}>
                <div class="field">
                  <p className="control has-icons-left">
                    <input
                      type="email"
                      id="email"
                      className="input"
                      placeholder="Correo"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user">
                        <img src={usermailIcon} className="icon-login" />
                      </i>
                    </span>
                  </p>
                </div>

                <button class="button is-link is-rounded">Enviar</button>
              </form>
              <p className="new-account">
                <span>
                  <Link to="/login">Inicia sesión</Link>
                  <br />
                  <Link to="/register">Registrate</Link>
                </span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
