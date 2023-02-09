import userPasswordIcon from "../../../assets/key-login.png";
import "./Login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../hooks/axios";

export default function ResetPassword() {
  const [reset, setReset] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const { id, token } = useParams();

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setErrMsg("Las contraseñas no coinciden");
      return;
    }

    //`https://looking.fly.dev/reset/${match.params.id}/${match.params.accessToken}`

    axios
      .post(`/reset/${id}/${token}`, {
        password,
        passwordConfirm,
      })
      .then((res) => {
        setReset(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (reset) {
      navigate("/login");
    }
  }, [reset]);

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
                      id="password"
                      name="password"
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
                      id="password2"
                      name="password2"
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
