import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import usermailIcon from "../../../assets/usermail-login.png";
import userPasswordIcon from "../../../assets/key-login.png";
import "./Login.css";

//const LOGIN_URL = "/client/login";

export default function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
    const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (storedAuth?.email && storedAuth?.password && storedAuth?.accessToken) {
      setAuth(storedAuth);
      navigate(from, { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://looking.fly.dev/client/login`,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const idClient = response?.data?.userId;

      setAuth({ email, password, accessToken });
      console.log(email, password, accessToken);
      localStorage.setItem(
        "auth",
        JSON.stringify({ email, password, idClient, accessToken })
      );
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
      window.location.reload();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sin respuesta del servidor(back)");
      } else if (err.response?.status === 400) {
        setErrMsg("Creo que escribiste mal la contraseña");
      } else if (err.response?.status === 401) {
        setErrMsg(
          "No estás registrado, no vas a poder entrar sin registrarte :)"
        );
      } else {
        setErrMsg("Error al ingresar");
      }
    }
  };

  return (
    <>
      <div className="container-page-login">
        <div className="container-login">
          <div className="form-container-login">
            <section>
              <div className="error-messg-server">{errMsg}</div>

              <div className="title is-4 is-spaced">Ingresar a la aventura</div>
              <form onSubmit={handleSubmit}>
                <div className="field">
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
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      type="password"
                      id="passwordLogin"
                      className="input"
                      placeholder="Contraseña"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user">
                        <img src={userPasswordIcon} className="icon-login" />
                      </i>
                    </span>
                  </p>
                </div>
                <button className="button is-link is-rounded">Ingresar</button>
                <p>
                  <Link to="/forgotpassword">Recuperar contraseña</Link>
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
