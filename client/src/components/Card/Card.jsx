import React from "react";
import { Link } from "react-router-dom";

function Card({ id, image, title, capacity, beds, rating }) {
  return (
    <Link to={`/propertyDetail/${id}`} style={{ textDecoration: "none" }}>
      <div className="card has-background-grey-dark">
        <h2
          className="title has-text-centered is-capitalized is-italic"
          // style={{ color: "black" }}
        >
          {title}
        </h2>
        <p className="has-text-centered has-text-white">
          Valoracion : {rating}
        </p>
        <div className="card-image">
          <figure className="image is-3by3">
            <img src={image} alt={title} />
          </figure>
        </div>
        <div className="card-content has-text-centered has-text-white is-italic has-text-weight-medium	 ">
          <p className="">Capacidad para {capacity} personas</p>
          {Number(beds) > 1 ? (
            <p>Contamos con {beds} camas</p>
          ) : (
            <p>Contamos con {beds} cama</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Card;
