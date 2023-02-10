import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";
import Card from "../Card/Card";
import "./Home.css";
import Filters from "../Filters/Filters";
import { useLoadScript } from "@react-google-maps/api";
import { Pagination } from "../Pagination/Pagination";

function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDrViDX9rfRwIuHnmg19Ss7qT9UgIwD_Ok",
    libraries: ["places"],
  });

  const url = "http://localhost:3000/properties";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertiesAsync(url));
  }, []);

  //----------------------Pagintado--------------------------------
  const [propertyPerPage, setPropertyPerAge] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * propertyPerPage;
  const firstIndex = lastIndex - propertyPerPage;
  //---------------------------------------------------------------

  const statePropertys = useSelector((state) => state.properties.allPropertys);
  console.log("statePropertys:", statePropertys.result?.length);
  if (!isLoaded) return <h1>Cargando...</h1>;
  if (!statePropertys) return <h1>Cargando...</h1>;

  const totalProperty = statePropertys.result?.length;
  console.log("totalProperty:", totalProperty);

  
  return (
    <div className="containerHome ">
      <div className="containerFilters box">
        <Filters></Filters>
      </div>
      <div className="containerCards">
        <div className="columns is-multiline box">
          {statePropertys.result
            ?.map((property, i) => {
              return (
                <div key={i} className="column is-2">
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
        <Pagination
          propertyPerPage={propertyPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProperty={totalProperty}
        />
      </div>
    </div>
  );
}

export default Home;

{
  /*
  
  const { data: cards, error } = useGetCardsQuery();
  <NavBar className="w-3" />
      <div className="md:flex gap-4 shrink-0">
        {cards?.length
          ? cards.map((card) => (
              <ul key={card.id}>
                <Card
                  title={card.title}
                  image={card.image}
                  capacity={card.capacity}
                  rating={card.rating}
                />
              </ul>
            ))
          : console.log(error)}
      </div>*/
}
