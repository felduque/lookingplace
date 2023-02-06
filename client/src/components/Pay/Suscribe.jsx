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
        <div className="title is-2">
          ¿Por qué ser PRO?
        </div>

        <div>


          <div className="subtitle is-3">Recibe los mejores beneficios en LookingPlace</div>
          <div className='circle-plan-pro display-line'>
            <img src={topPRO} className='icon-plan-pro'/>
              <div className='subtitle is-5 pro-description'>
                Aparece en las mejores posiciones dentro del sitio
              </div>
          </div>
          <div className='circle-plan-pro display-line'>
            <img src={chatPRO} className='icon-plan-pro'/>
              <div className='subtitle is-5 pro-description'>
                Chat directo con los viajeros interesados en tu Places
              </div>
          </div>
          <div className='circle-plan-pro display-line'>
            <img src={filtersPRO} className='icon-plan-pro'/>
              <div className='subtitle is-5 pro-description'>
                Agrega filtros especiales a tus Places disponibles
              </div>
          </div>
          {
            // Poner ! en auth para testear paneles sin iniciar sesión
          auth?.email ? 
          (
            <div className="center-button-pro-logged">
             <PaymentMP/>
            </div>
          ) : 
            <div>
               <a className="button is-primary center-button-pro" to='/register'>
                 <Link to="/register">
                   <strong>Registrarse para ser PRO</strong>
                 </Link>
               </a>
            </div>
          }
        </div>
      </div>
      </div>
    </>
  )
}