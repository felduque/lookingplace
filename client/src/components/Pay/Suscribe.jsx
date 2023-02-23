import AuthContext from "../context/AuthProvider";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaymentMP from "../Pay/PaymentMP";
import MPButtonSuscription from "../MercadoPago/MercadoPagoSuscri";
import { getTenantById, getUserById } from "../Admin/Api";
import axios from "axios";
import "./Suscribe.css";

export default function Suscribe() {
  const { auth, setAuth } = useContext(AuthContext);
  const [usersLocal, setUsersLocal] = useState();
  const dataPayer = JSON.parse(localStorage.getItem("auth"));
  console.log(dataPayer);

  useEffect(() => {
    const petition = async () => {
      const data = await axios(
        `http://localhost:3000/tenant/gettenant/${dataPayer.idTenant}`
      );
      console.log("Data: ", data);
      setUsersLocal(data.data);
    };
    petition();
  }, []);

  console.log("UserLocal: ", usersLocal);

  return (
    <>
      <div className="container-PRO">
        <div className="planes-PRO">
          <div className="title is-2 center-text">¿Por qué ser PRO?</div>

          <div>
            <div className="conteiner-planes">
              <div className="title is-4 center-text is-italic text-planes">
                Conoce nuestros planes gratis y Profesional
              </div>
              <div className="pricing-table">
                <div class="cards">
                  <div class="card shadow">
                    <ul>
                      <li class="pack">Básico</li>
                      <li id="basic" class="price bottom-bar">
                        Gratis
                      </li>
                      <li class="bottom-bar">Busca y publica hospedaje</li>
                      <li class="bottom-bar">Comenta y puntúa tus visitas</li>
                      <li>
                        <div className="button-bottom">
                          {usersLocal?.isPro === true ? (
                            <div></div>
                          ) : (
                            <div>
                              <a className="button is-primary center-button-pro">
                                <strong>Tu plan actual</strong>
                              </a>
                            </div>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="card active">
                    <ul>
                      <li class="pack">Profesional</li>
                      <li id="professional" class="price bottom-bar">
                        $8.99
                        <span className="new-price-oro">
                          <del>$13.99</del>
                        </span>
                      </li>
                      <li class="bottom-bar">Beneficios del plan básico</li>
                      <li class="bottom-bar">Mejor posicionamiento</li>
                      <li class="bottom-bar">Propiedades sin límite</li>
                      <li class="bottom-bar">Panel de control avanzado</li>
                      <li>
                        {
                          // Poner ! en auth para testear paneles sin iniciar sesión

                          <div>
                            {usersLocal?.isPro === true ? (
                              <div>
                                <a
                                  className="button is-primary center-button-pro"
                                  disabled
                                >
                                  <strong>Tu plan actual</strong>
                                </a>
                              </div>
                            ) : (
                              <div>
                                <MPButtonSuscription
                                  idTenant={dataPayer.idTenant}
                                  emailTenant={dataPayer.email}
                                  nameTenant={dataPayer.fullName}
                                />
                              </div>
                            )}
                          </div>
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
