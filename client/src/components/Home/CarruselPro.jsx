import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";
import iconpro from "../../assets/icon-pro.png"

export default function CarruselPro() {
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

  const [mostrarDiv, setMostrarDiv] = useState(false);

  function mostrarOcultar() {
    setMostrarDiv(!mostrarDiv);
  }

  return (
    <div>
      <div className="">
				<div className="icon-pro">
        <button className="button is-warning is-rounded is-outlined " onClick={mostrarOcultar}><img src={iconpro} width="30px" height="30px"></img></button>
				</div>
        <div style={{ display: mostrarDiv ? "block" : "none" }}>
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
                className={`pagination-next button is-warning  is-info is-outlined space-right-next ${
                  currentPage >= pageNumber.length ? "is-disabled" : ""
                }`}
                onClick={onNextPage}
              >
                ❱
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
