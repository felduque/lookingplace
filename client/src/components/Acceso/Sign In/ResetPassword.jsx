import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import userPasswordIcon from "../../../assets/key-login.png";
import "./Login.css";
import axios from "axios";

export default function ResetPassword(props) {
  const [reset, setReset] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      token: props.match.params.id,
      password: password,
      confirmPassword: passwordConfirm,
    };

    axios
      .post("/reset", data)
      .then((res) => {
        console.log(res);
        setReset({ reset: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (reset) {
    return <Redirect to={"/login"} />;
  }

  return (
    <>
      <div className="container-page-login">
        <div className="container-login">
          <div className="form-container-login">
            <section>
              <div className="error-messg-server">{errMsg}</div>

              <div class="title is-4 is-spaced">Resetear contraseña</div>
              <form onSubmit={handleSubmit}>
                <div class="field">
                  <p className="control has-icons-left">
                    <input
                      type="password"
                      id="passwordLogin"
                      className="input"
                      placeholder="Contraseña"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user">
                        <img src={userPasswordIcon} className="icon-login" />
                      </i>
                    </span>
                  </p>
                </div>

                <div class="field">
                  <p className="control has-icons-left">
                    <input
                      type="password"
                      id="passwordLogin"
                      className="input"
                      placeholder="Confirmar contraseña"
                      autoComplete="off"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user">
                        <img src={userPasswordIcon} className="icon-login" />
                      </i>
                    </span>
                  </p>
                </div>

                <button class="button is-link is-rounded">Submit</button>
                <p>
                  <Link to="/forgot">Recuperar contraseña</Link>
                </p>
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
