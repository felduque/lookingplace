import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import './LandingPage.css';
import logoLookingPlace from '../../assets/logo-icon.png'
import video from '../../assets/landingpage.mp4';
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";


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
        <div className='video-landing'>
            
          <div className='container-header'>

            <div className='backpack-lookingplace'>
              <div className='column is-one-third'>
                <img src={logoLookingPlace} className='backpack-logo'/>
              </div>
              <div className='column title has-text-white logo-centered'>
                LookingPlace
              </div>
            </div>
                
            <div className='title has-text-white is-half-desktop center-element column has-text-shadow has-text-justified is-italic'>
              <p className='descrption-lookingplace'>
              &#171; LookingPlace es un sitio que te permite ofrecer hospedaje a los aventureros, 
              o si eres uno encontrar un sitio seguro para continuar tu aventura. &#187;
              </p>
            </div>

          </div>
            
        <div className='overlay'></div>
          <video src={video} autoPlay loop muted/>
        </div>

    <div className="bottom-container">
      <div className="title is-4 center-text is-italic">Te recomendamos los mejores Places</div>
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
    <a href='/'><button class="button is-link is-focused  is-medium into-home-button">
      LookingPlace
      </button>
      </a>
  </div>

    </div>  
      </>
    )
};