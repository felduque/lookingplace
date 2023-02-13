import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import bedsIcon from "../../assets/beds-icon.png";
import bathroomIcon from "../../assets/batchroom-icon.png";
import favoriteIcon from "../../assets/favorite-icon.png";
import capacityIcon from "../../assets/capacity-icon-2.png";
import starIcon from "../../assets/star-icon.png";

import ImageSlider from './ImageSlider.jsx';

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
}) {
  const slides = [
    { url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg", title: "Beach" },
    { url: "https://images.pexels.com/photos/8317058/pexels-photo-8317058.jpeg", title: "Boat" },
    { url: "https://images.pexels.com/photos/8317006/pexels-photo-8317006.jpeg", title: "Forest" },
    { url: "https://images.pexels.com/photos/3635805/pexels-photo-3635805.jpeg", title: "City" },
    { url: "https://images.pexels.com/photos/1560065/pexels-photo-1560065.jpeg", title: "Venecia" },
  ];
  
const containerStyles = {
  width: "300px",
  height: "250px",
  margin: "0 auto",
  zIndex: 10
}
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
                <span>{rating}/5</span>
              </div>

              <div className="column">
                <img src={capacityIcon} className="icon-capacity" />
              </div>
              <div className="column">
                <span>{capacity}</span>
              </div>

              <div className="column">
                <img src={bedsIcon} className="icon-beds" />
              </div>
              <div className="column">
                <span>{beds}</span>
              </div>

              <div className="column">
                <img src={bathroomIcon} className="icon-bathroom"/>
              </div>
              <div className="column">
                  <span>{baths}</span>
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
