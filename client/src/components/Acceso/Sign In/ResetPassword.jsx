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
  const [setType, setSetType] = useState({
    client: false,
    tenant: false,
  });

  const handleChangeType = (e) => {
    const { name } = e.target;
    setSetType({
      client: false,
      tenant: false,
      [name]: true,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setErrMsg("Las contraseñas no coinciden");
      return;
    }

    //`http://localhost:3000/reset/${match.params.id}/${match.params.accessToken}`

    if (setType.client === true) {
      axios
        .post(`/client/reset/${id}/${token}`, {
          password,
          passwordConfirm,
        })
        .then((res) => {
          setReset(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (setType.tenant === true) {
      axios
        .post(`/tenant/reset/${id}/${token}`, {
          password,
          passwordConfirm,
        })
        .then((res) => {
          setReset(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Reset Fallido",
        text: "Algo salió mal, Marca tipo de usuario.",
        icon: "error",
        confirmButtonText: "Entendido",
        timer: 4000,
      });
    }
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
              </form>
              <p className="new-account">
                ¿No tienes cuenta? <br />
                <span>
                  <Link to="/register">Registrarme</Link>
                </span>
              </p>
              <div className="pt-3">
                <button
                  name="client"
                  onClick={handleChangeType}
                  className="button is-link is-rounded ml-6"
                >
                  Soy Cliente
                </button>
                <button
                  name="tenant"
                  onClick={handleChangeType}
                  className="button is-link is-rounded ml-3"
                >
                  Soy Arrendatario
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
