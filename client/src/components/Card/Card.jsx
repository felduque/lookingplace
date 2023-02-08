import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import bedsIcon from "../../assets/beds-icon.png";
import bathroomIcon from "../../assets/batchroom-icon.png";
import favoriteIcon from "../../assets/favorite-icon.png";
import capacityIcon from "../../assets/capacity-icon.png";

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
  return (
    <div>
      <Link to={`/propertyDetail/${id}`} style={{ textDecoration: "none" }}>
        <div className="container-card">
          <div>
            <figure className="image is-3by3">
              <img src={image} className="image-cover-card" />
            </figure>
          </div>
          <div className="details-card-inline">
            <div>{country}</div>
            <div>{state}</div>
            {/* <div>{region}</div> */}
            <div className="inline-element">${price}</div>
            <div className="inline-element element-fav">
              <img src={favoriteIcon} className="icon-fav" />
            </div>
            <div> {rating}/5</div>
            <p>
              <img src={capacityIcon} className="icon-capacity" /> {capacity}
            </p>
            <p>
              <img src={bedsIcon} className="icon-beds" /> {beds}
            </p>
            <p>
              <img src={bathroomIcon} className="icon-bathroom" /> {baths}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
