import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";
import Card from "../Card/Card";
import "./Home.css";
import Filters from "../Filters/Filters";
import { useLoadScript } from "@react-google-maps/api";
import { Pagination } from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDrViDX9rfRwIuHnmg19Ss7qT9UgIwD_Ok",
    libraries: ["places"],
  });

  const [loading, setLoading] = useState(true);

  const url = "http://localhost:3000/properties";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertiesAsync(url)).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    });
  }, []);

  //----------------------Pagintado--------------------------------
  const [propertyPerPage, setPropertyPerAge] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * propertyPerPage;
  const firstIndex = lastIndex - propertyPerPage;
  //---------------------------------------------------------------

  const statePropertys = useSelector((state) => state.properties.allPropertys);

  const totalProperty = statePropertys.result?.length;


  console.log(loading)
  if (loading || !isLoaded) {
    return <Loader />;
  }


  return (
    <div>
      <div className="containerCards">
        <div className="columns is-multiline box space-justify">
          {statePropertys.result
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
      </div>
      <div className="pagination">
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