import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";
import Card from "../Card/Card";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertiesAsync());
  }, []);

  const statePropertys = useSelector((state) => state.properties.allPropertys);
  console.log(statePropertys);

  return (
    <div className="container">
      <div className="section">
        <div className="columns">
          {statePropertys.map((property) => {
            return (
              <Card
                key={property.id}
                id={property.id}
                title={property.title}
                image="https://picsum.photos/200/250"
                capacity={property.capacity}
                beds={property.beds}
                rating={property.rating}
              ></Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
