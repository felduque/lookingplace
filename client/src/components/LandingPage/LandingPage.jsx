import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import "./LandingPage.css";
import "./PricingTable.css";
import "./Reviews.css";
import logoLookingPlace from "../../assets/logo-icon.png";
import video from "../../assets/landingpage.mp4";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";

import messi from "../../assets/testimonials/messi.jpg";
import t2 from "../../assets/testimonials/t-2.jpg";
import t3 from "../../assets/testimonials/t-3.jpg";
import t4 from "../../assets/testimonials/t-4.jpg";
import t5 from "../../assets/testimonials/t-5.jpg";
import Loader from "../Loader/Loader";

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

  let arrayFiltrados = statePropertys.result?.filter((e) => e.pro === true);
  console.log("Soy array Filtrados", arrayFiltrados);

  //---------------------------------------------------------------

  //-----------------------------Loader----------------------------
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

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
                className={`pagination-previous button is-warning is-outlined ${
                  currentPage === 1 ? "is-disabled" : ""
                }`}
                onClick={onPreviusPage}
              >
                ❰
              </button>
            </div>

            <div className="container-pro columns is-multiline box">
              {arrayFiltrados
                ?.map((property, i) => {
                  return (
                    <div key={i}>
                      <Card
                        // className="card"
                        key={property.id}
                        id={property.id}
                        price={property.price}
                        image={property.image}
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
                className={`pagination-next button is-warning is-outlined space-right-next ${
                  currentPage >= pageNumber.length ? "is-disabled" : ""
                }`}
                onClick={onNextPage}
              >
                ❱
              </button>
            </div>
          </div>
          <a href="/home">
            <button class="button is-link is-focused  is-medium into-home-button">
              Entrar al sitio
            </button>
          </a>
        </div>

        <div>
          <div className="title is-4 center-text is-italic text-planes">
            Conoce los comentarios de nuestros usuarios
          </div>
          <section id="grid">
            <div class="container">
              <div class="grid-box grid-box-purple grid-box-daniel">
                <div class="grid-box-author">
                  <img src={messi} alt="" />
                  <div class="grid-box-author-title">
                    <p>Lionel M.</p>
                    <p class="small">Campeón del mundo</p>
                  </div>
                </div>
                <h4>La oportunidad que ofrece LookingPlace es única</h4>
                <blockquote>
                  “ Como mochilero, siempre busco maneras de ahorrar dinero y
                  encontrar lugares auténticos para alojarme. En mi última
                  competencia en el extranjero, descubrí LookingPlace y encontré
                  alojamiento a un precio muy asequible. La página fue fácil de
                  usar y me permitió encontrar un alojamiento cómodo y bien
                  ubicado. Definitivamente recomendaría LookingPlace a cualquier
                  mochilero.”
                </blockquote>
              </div>
              <div class="grid-box grid-box-gray grid-box-jonathan">
                <div class="grid-box-author">
                  <img src={t2} alt="" />
                  <div class="grid-box-author-title">
                    <p>Andrés Z.</p>
                    <p class="small">Mochilero recurrente</p>
                  </div>
                </div>
                <h4>Ahora sé que estoy más seguro mientras viajo</h4>
                <blockquote>
                  “ Como mochilero, encontrar un lugar seguro y económico para
                  dormir puede ser difícil. Descubrí LookingPlace y encontré un
                  alojamiento acogedor en una zona tranquila. ”
                </blockquote>
              </div>
              <div class="grid-box grid-box-white grid-box-kira">
                <div class="grid-box-author">
                  <img src={t4} alt="" />
                  <div class="grid-box-author-title">
                    <p>Alicia M.</p>
                    <p class="small">Dando la vuelta al mundo</p>
                  </div>
                </div>
                <h4>LookingPlace cambio mi forma de viajar</h4>
                <blockquote>
                  “ Como mochilero, siempre estoy buscando formas de ahorrar
                  dinero mientras viajo por el mundo. Fue entonces cuando
                  descubrí LookingPlace, una página que me permitió encontrar
                  alojamiento a un precio asequible en diferentes partes del
                  mundo. Recomendaría LookingPlace a cualquier mochilero que
                  busque alojamiento económico y confiable. ”
                </blockquote>
              </div>
              <div class="grid-box grid-box-white grid-box-jeanette">
                <div class="grid-box-author">
                  <img src={t3} alt="" />
                  <div class="grid-box-author-title">
                    <p>Alonso Swatt</p>
                    <p class="small">Programador remoto</p>
                  </div>
                </div>
                <h4>Ahora ofrezco mi casa mientras viajo también</h4>
                <blockquote>
                  “ Como anfitrión de LookingPlace, he tenido la oportunidad de
                  conocer a mochileros de todo el mundo y compartir mi cultura
                  local. La página es fácil de usar y me ha permitido aumentar
                  mi ocupación. ”
                </blockquote>
              </div>
              <div class="grid-box grid-box-navy grid-box-patrick">
                <div class="grid-box-author">
                  <img src={t5} alt="" />
                  <div class="grid-box-author-title">
                    <p>Julie Halad</p>
                    <p class="small">Familia acojedora</p>
                  </div>
                </div>
                <h4>Obtengo ingresos extras sin complicaciones</h4>
                <blockquote>
                  “ Como anfitrión, LookingPlace ha sido una excelente forma de
                  conectar con mochileros de todo el mundo. Me ha permitido
                  publicar mi alojamiento de manera fácil y rápida, y ha atraído
                  a una gran cantidad de viajeros que buscan alojamiento
                  asequible. Además, he tenido la oportunidad de conocer a
                  personas increíbles y compartir historias de viaje. ”
                </blockquote>
              </div>
            </div>
          </section>
        </div>

        
      </div>
    </>
  );
}
