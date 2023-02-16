import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import "./LandingPage.css";
import "./PricingTable.css";
import "./Reviews.css";
import logoLookingPlace from "../../assets/logo-icon.png";
import video from "../../assets/landingpage.mp4";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";

import viajera from '../../assets/minita-review.jpg';
import messireview from '../../assets/messi-review.jpg';

export default function LandingPage() {
  const url = "http://localhost:3000/properties";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertiesAsync(url));
  }, []);

  const statePropertys = useSelector((state) => state.properties.allPropertys);

  //----------------------Pagintado--------------------------------
  const [propertyPerPage, setPropertyPerAge] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * propertyPerPage;
  const firstIndex = lastIndex - propertyPerPage;

  const pageNumber = [];

  const totalProperty = statePropertys.result?.length;

  for (let i = 1; i <= Math.ceil(totalProperty / propertyPerPage); i++) {
    pageNumber.push(i);
  }

  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  //---------------------------------------------------------------

  return (
    <>
      <div className="content-total-page">
        <div className="video-landing">
          <div className="container-header">
            <div className="backpack-lookingplace">
              <div className="column is-one-third">
                <img src={logoLookingPlace} className="backpack-logo" />
              </div>
              <div className="column title has-text-white logo-centered">
                LookingPlace
              </div>
            </div>

            <div className="title has-text-white is-half-desktop center-element column has-text-shadow has-text-justified is-italic">
              <p className="descrption-lookingplace">
                &#171; LookingPlace es un sitio que te permite ofrecer hospedaje
                a los aventureros, o si eres uno encontrar un sitio seguro para
                continuar tu aventura. &#187;
              </p>
            </div>
          </div>

          <div className="overlay"></div>
          <video src={video} autoPlay loop muted />
        </div>

        <div className="bottom-container">
          <div className="title is-4 center-text is-italic">
            Te recomendamos los mejores lugares
          </div>
          <div className="carrusel-cards">
            <div className="carrusel-left">
              <button
                disabled={currentPage === 1 ? true : false}
                className={`pagination-previous button is-info is-outlined ${
                  currentPage === 1 ? "is-disabled" : ""
                }`}
                onClick={onPreviusPage}
              >
                ❰
              </button>
            </div>

            <div className="columns is-multiline box">
              {statePropertys.result
                ?.map((property, i) => {
                  return (
                    <div key={i}>
                      <Card
                        // className="card"
                        key={property.id}
                        id={property.id}
                        price={property.price}
                        image="https://picsum.photos/200/250"
                        capacity={property.capacity}
                        beds={property.beds}
                        baths={property.baths}
                        rating={property.rating}
                        country={property.country}
                        state={property.state}
                        region={property.region}
                      ></Card>
                    </div>
                  );
                })
                .slice(firstIndex, lastIndex)}
            </div>

            <div className="carrusel-right">
              <button
                disabled={currentPage >= pageNumber.length ? true : false}
                className={`pagination-next button is-info is-outlined space-right-next ${
                  currentPage >= pageNumber.length ? "is-disabled" : ""
                }`}
                onClick={onNextPage}
              >
                ❱
              </button>
            </div>
          </div>
          <a href="/">
            <button class="button is-link is-focused  is-medium into-home-button">
              Entrar al sitio
            </button>
          </a>
        </div>

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
                    <button class="btn">
                      <i class="bi bi-bag"></i><strong>Obtener ahora</strong>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="card active">
                <ul>
                  <li class="pack">Profesional</li>
                  <li id="professional" class="price bottom-bar">
                    $8.99{" "}
                    <span className="new-price-oro">
                      <del>$13.99</del>
                    </span>
                  </li>
                  <li class="bottom-bar">Beneficios del plan básico</li>
                  <li class="bottom-bar">Mejor posicionamiento</li>
                  <li class="bottom-bar">Propiedades sin límite</li>
                  <li class="bottom-bar">Panel de control avanzado</li>
                  <li>
                    <button class="btn active-btn">
                      <i class="bi bi-bag"></i><strong>Obtener ahora</strong>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container-inf">
          <div className="title is-4 center-text is-italic text-planes">
            Conoce la experiencia de nuestros usuarios
          </div>
          <div className="container-reviews">
            <input type="radio" name="nav" id="first" checked />
            <input type="radio" name="nav" id="second" />
            <input type="radio" name="nav" id="third" />

            <label for="first" class="first"></label>
            <label for="second" class="second"></label>
            <label for="third" class="third"></label>

            <div class="one slide">
              <blockquote className="title is-5 has-text-white justify">
                <span class="leftq quotes">&#171;</span>Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Nam nisl nulla, egestas sed
                mattis a, venenatis at turpis. Fusce mattis luctus erat vel
                rutrum. Integer maximus eget est nec placerat.
                <span class="rightq quotes">&#187; </span>
              </blockquote>
              <img src={viajera} />
              <h2>Hadrianus Augustus</h2>
              <h6>UI/UX/XVII Designer at Roman Coliseum</h6>
            </div>

            <div class="two slide">
              <blockquote className="title is-5 has-text-white justify">
                <span class="leftq quotes">&#171;</span>In ultrices lectus vel
                purus posuere, vitae consectetur lacus faucibus. Ut luctus diam
                arcu, non aliquam augue laoreet eget. Sed tristique ante sapien,
                eget eleifend risus accumsan eget...
                <span class="rightq quotes">&#187;</span>
              </blockquote>
              <img src={messireview} />
              <h2>Caesar Augustus</h2>
              <h6>CEO The Roman Empire</h6>
            </div>

            <div class="three slide">
              <blockquote className="title is-5 has-text-white justify">
                <span class="quotes leftq">&#171;</span>Sed mauris quam, congue
                at eros et, fermentum mollis tellus. Sed ullamcorper est pretium
                velit facilisis, quis ornare ex volutpat. Quisque finibus mattis
                nibh, quis egestas dolor mollis in.
                <span class="rightq quotes">&#187; </span>
              </blockquote>
              <img src={viajera} />
              <h2>Flavius Domitianus</h2>
              <h6>Chair of Finance, Ancient Rome</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
