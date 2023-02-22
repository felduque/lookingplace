import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import PaymentMP from '../Pay/PaymentMP';

import './Suscribe.css';
import topPRO from '../../assets/pro-top.png';
import chatPRO from '../../assets/pro-chat.png';
import filtersPRO from '../../assets/pro-filter.png';

export default function Suscribe() {

  const { auth, setAuth } = useContext(AuthContext);


  return (
    <>
      <div className='container-PRO'>
        <div className='planes-PRO'>
        <div className="title is-2 center-text">
          ¿Por qué ser PRO?
        </div>

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
          {
          auth ? 
          (
            <div>
               <a className="button is-primary center-button-pro">
                   <strong>Tu plan actual</strong>
               </a>
            </div>
          ) : 
            <div>
               <a className="button is-primary center-button-pro" to='/register'>
                 <Link to="/register">
                   <strong>Registrarse</strong>
                 </Link>
               </a>
            </div>
          }
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
          auth ? 
          (
            <PaymentMP/>
          ) : 
            <div>
               <a className="button is-primary center-button-pro" to='/register'>
                 <Link to="/register">
                   <strong>Registrarse para ser PRO</strong>
                 </Link>
               </a>
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
  )
}