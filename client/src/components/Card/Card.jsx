import React from "react";

function Card({ image, title, capacity, rating }) {
  return (
    <div className=" dark:bg-slate-800  max-w-sm mx-auto rounded-xl  overflow-hidden md:max-w-2xl  ">
      <div className="md:flex text-cyan-100 ">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={image}
            alt="image"
          />
        </div>
        <div className="p-8">
          <h2 className="text-lg font-medium  text-right ">titulo:{title}</h2>
          <p className="mt-2 ">capacidad: {capacity}</p>
          <p>rating:{rating}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
