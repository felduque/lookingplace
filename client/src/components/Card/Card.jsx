import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import bedsIcon from "../../assets/beds-icon.png";
import bathroomIcon from "../../assets/batchroom-icon.png";
import favoriteIcon from "../../assets/favorite-icon.png";
import capacityIcon from "../../assets/capacity-icon-2.png";
import starIcon from "../../assets/star-icon.png";

import ImageSlider from "./ImageSlider.jsx";

function Card({
  id,
  image,
  price,
  capacity,
  beds,
  baths,
  rating,
  country,
  state,
  region,
  comments,
}) {
  const slides = [];
  image?.forEach((e) => slides.push({ url: e }));
  // console.log(slides);
  // const slides = [
  //   { url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg", title: "Beach" },
  //   { url: "https://images.pexels.com/photos/8317058/pexels-photo-8317058.jpeg", title: "Boat" },
  //   { url: "https://images.pexels.com/photos/8317006/pexels-photo-8317006.jpeg", title: "Forest" },
  //   { url: "https://images.pexels.com/photos/3635805/pexels-photo-3635805.jpeg", title: "City" },
  //   { url: "https://images.pexels.com/photos/1560065/pexels-photo-1560065.jpeg", title: "Venecia" },
  // ];

  console.log(comments);
  let arrayCalificacioCard = [];
  comments?.forEach((c) => {
    if (c.calificacion !== null)
      arrayCalificacioCard = [...arrayCalificacioCard, c.calificacion];
  });

  console.log("Soy ArrayCalificacion card", arrayCalificacioCard);

  let promedio =
    arrayCalificacioCard.reduce(
      (acumulador, currentValue) => acumulador + currentValue,
      0
    ) / arrayCalificacioCard.length;

  if (promedio % 1 === 0) {
    promedio = promedio + ".0";
  }

  if (isNaN(promedio)) promedio = "0.0";
  console.log(promedio);

  const containerStyles = {
    width: "280px",
    height: "250px",
    margin: "0 auto",
    zIndex: 10,
  };
  return (
    <div>
      <div className="container-card column">
        <div style={containerStyles}>
          <ImageSlider slides={slides} />
        </div>

        <Link to={`/propertyDetail/${id}`} style={{ textDecoration: "none" }}>
          <div className="details-card">
            <div>{country}</div>
            <div>{state}</div>
            {/* <div>{region}</div> */}
            <div>${price}</div>
            <div className="details-icons">
              <div className="columns is-gapless">
                <div className="column">
                  <img src={starIcon} className="icon-star" />
                </div>
                <div className="column">
                  <span className="number-card">{promedio}/5.0</span>
                </div>

                <div className="column">
                  <img src={capacityIcon} className="icon-capacity" />
                </div>
                <div className="column">
                  <span className="number-card">{capacity}</span>
                </div>

                <div className="column">
                  <img src={bedsIcon} className="icon-beds" />
                </div>
                <div className="column">
                  <span className="number-card">{beds}</span>
                </div>

                <div className="column">
                  <img src={bathroomIcon} className="icon-bathroom" />
                </div>
                <div className="column ">
                  <span className="number-card">{baths}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
