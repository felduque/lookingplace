import React from "react";
import { Link } from "react-router-dom";

function Card({ id, image, title, capacity, beds, rating }) {
  return (
    <Link to={`/propertyDetail/${id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <h2 className="title" style={{ color: "black" }}>
          {title}
        </h2>
        <div className="card-image">
          <figure className="image is-3by3">
            <img src={image} alt={title} />
          </figure>
        </div>
        <div className="card-content">
          <p>Capacidad para {capacity} personas</p>
          <p>Camas {beds}</p>
          <p>Valoracion : {rating}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
