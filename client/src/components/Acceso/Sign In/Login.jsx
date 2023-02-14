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

export default function Login() {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [setType, setSetType] = useState({
    client: false,
    tenant: false,
  });
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
        //const role = roleMapping[email] || "default";

        setAuth({ email, password, accessToken, role });
        console.log(email, password, accessToken);
        localStorage.setItem(
          "auth",
          JSON.stringify({ email, password, idClient, accessToken, role })
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
        //const role = roleMapping[email] || "default";

        setAuth({ email, password, accessToken, role });
        console.log(email, password, accessToken);
        localStorage.setItem(
          "auth",
          JSON.stringify({ email, password, idTenant, accessToken, role })
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
  function back() {
    navigate(from, { replace: true });
  }

  return (
    <>
      <div className="opacityimg">
        <img src={leftarrow} alt="" className="btnBackLogin" onClick={back} />
      </div>
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
              <p>
                <LoginGoogle />
              </p>
              <p className="new-account">
                ¿No tienes cuenta? <br />
                <span>
                  <Link to="/register">Registrarme</Link>
                </span>
                {/* <LoginGoogle /> */}
              </p>
              <button
                name="client"
                onClick={handleChangeType}
                className="button is-link is-rounded"
              >
                soy Cliente
              </button>
              <button
                name="tenant"
                onClick={handleChangeType}
                className="button is-link is-rounded"
              >
                Soy Arrendatario
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
