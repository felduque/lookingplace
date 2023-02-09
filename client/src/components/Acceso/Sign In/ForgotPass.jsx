import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import usermailIcon from "../../../assets/usermail-login.png";
import "./Login.css";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [errMsg, setErrMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/client/forgot", email)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // acá debería enviar una solicitud a la API para enviar el correo electrónico de recuperación de contraseña
  }

  return (
    <>
      <div className="container-page-login">
        <div className="container-login">
          <div className="form-container-login">
            <section>
              <div className="error-messg-server">{errMsg}</div>

              <div class="title is-4 is-spaced">Recuperar contraseña</div>
              <form onSubmit={handleSubmit}>
                <div class="field">
                  <p className="control has-icons-left">
                    <input
                      type="email"
                      id="emailname"
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
                ¿No tienes cuenta? <br />
                <span>
                  <Link to="/register">Registrarme</Link>
                </span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}