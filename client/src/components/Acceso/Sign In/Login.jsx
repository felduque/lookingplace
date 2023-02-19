import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import usermailIcon from "../../../assets/usermail-login.png";
import userPasswordIcon from "../../../assets/key-login.png";
import leftarrow from "../../../assets/flecha-izquierda.png";
import "./Login.css";
import LoginGoogle from "./LoginGoogle";

//const LOGIN_URL = "/client/login";

export default function Login({ closeModal }) {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [setType, setSetType] = useState({
    client: false,
    tenant: false,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleChangeType = (e) => {
    const { name } = e.target;
    setSetType({
      client: false,
      tenant: false,
      [name]: true,
    });
  };

  useEffect(() => {
    setErrMsg("");
    const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (storedAuth?.email && storedAuth?.password && storedAuth?.accessToken) {
      setAuth(storedAuth);
      navigate(from, { replace: true });
    }
  }, []);

  /* const roleMapping = {
    "davidezfl3prueba@gmail.com": "Client",
    "felipederuque@gmail.com": "Admin",
    "davidezflogin@gmail.com": "Admin",
    "davidezflprueba2@gmail.com": "Tenant",
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setType.client === true) {
      try {
        const response = await axios.post(
          `http://localhost:3000/client/login`,
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
        const role = response?.data?.role;
        const fullName = response?.data?.fullName;
        const avatar = response?.data?.avatar;
        //const role = roleMapping[email] || "default";

        setAuth({ email, password, accessToken, role, avatar, fullName });
        console.log(email, password, accessToken);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            email,
            idClient,
            accessToken,
            role,
            avatar,
            fullName,
          })
        );
        setEmail("");
        setPassword("");
        //setRole("");
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
    } else if (setType.tenant === true) {
      try {
        const response = await axios.post(
          `http://localhost:3000/tenant/login`,
          JSON.stringify({ email: email, password: password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response);
        //console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const idTenant = response?.data?.userId;
        const role = response?.data?.role;
        const fullName = response?.data?.fullName;
        const avatar = response?.data?.avatar;
        //const role = roleMapping[email] || "default";

        setAuth({ email, password, accessToken, role, avatar, fullName });
        console.log(email, password, accessToken);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            email,
            idTenant,
            accessToken,
            role,
            avatar,
            fullName,
          })
        );
        setEmail("");
        setPassword("");
        //setRole("");
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
    } else if (auth.role === "Admin") {
      try {
        const response = await axios.post(
          `http://localhost:3000/client/login`,
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
        const role = response?.data?.role;
        const fullName = response?.data?.fullName;
        const avatar = response?.data?.avatar;
        //const role = roleMapping[email] || "default";

        setAuth({ email, password, accessToken, role, avatar, fullName });
        console.log(email, password, accessToken);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            email,
            idClient,
            accessToken,
            role,
            avatar,
            fullName,
          })
        );
        setEmail("");
        setPassword("");
        //setRole("");
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
    } else {
      Swal.fire({
        title: "Login fallido",
        text: "Algo salió mal, Marca tipo de usuario.",
        icon: "error",
        confirmButtonText: "Entendido",
        timer: 4000,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div class="modal is-active">
      <div class="modal-background" onClick={closeModal}></div>
      <div class="modal-content">
        <>
          <div className="container-page-login">
            <div className="form-container-login">
              <section>
                <div className="error-messg-server">{errMsg}</div>
                <div className="title is-4 is-spaced">
                  Ingresar a la aventura
                </div>
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
                  <div className="pt-2">
                    <button
                      name="client"
                      type="button"
                      className={
                        setType.client === true
                          ? "button is-link is-rounded"
                          : "button is-link is-outlined has-tooltip-right is-rounded"
                      }
                      onClick={handleChangeType}
                    >
                      Soy Cliente
                    </button>
                    <button
                      type="button"
                      name="tenant"
                      onClick={handleChangeType}
                      className={
                        setType.tenant === true
                          ? "button is-link ml-4 is-rounded"
                          : "button is-link is-outlined has-tooltip-right ml-4 is-rounded"
                      }
                    >
                      Soy Arrendatario
                    </button>
                  </div>
                  <div className="pt-2 pb-2">
                    <button
                      className="button is-link is-rounded"
                      disabled={
                        setType.client === false && setType.tenant === false
                      }
                    >
                      Ingresar
                    </button>
                  </div>
                  <p>
                    <Link to="/forgotpassword" onClick={closeModal}>
                      Recuperar contraseña
                    </Link>
                  </p>
                </form>
                <div className="pt-2">
                  <p>
                    <LoginGoogle />
                  </p>
                </div>
                <p className="new-account">
                  ¿No tienes cuenta? <br />
                  <span>
                    <Link to="/register" onClick={closeModal}>
                      Registrarme
                    </Link>
                  </span>
                  {/* <LoginGoogle /> */}
                </p>
              </section>
            </div>
          </div>
        </>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
  );
}
