import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";
import Card from "../Card/Card";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertiesAsync());
  }, []);

  const statePropertys = useSelector((state) => state.properties.allPropertys);
  console.log(statePropertys);

  if (!statePropertys) return <h1>Loading...</h1>;
  return (
    <div className="box">
      <div className="columns is-multiline">
        {statePropertys?.map((property) => {
          return (
            <div className="column is-2">
              <Card
                // className="card"
                key={property.id}
                id={property.id}
                title={property.title}
                image="https://picsum.photos/200/250"
                capacity={property.capacity}
                beds={property.beds}
                rating={property.rating}
              ></Card>
            </div>
          );
        })}
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
