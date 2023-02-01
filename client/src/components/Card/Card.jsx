import React from "react";

function Card({ image, title, capacity, rating }) {
  return (
    <div className="max-w-sm mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl gap-1 dark:bg-slate-800 ">
      <div className="md:flex ">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={image}
            alt=""
          />
        </div>
        <div className="p-8">
          <h2 className="text-lg font-medium  text-right text-cyan-50">
            titulo:{title}
          </h2>
          <p className="mt-2 text-slate-200">capacidad: {capacity}</p>
          <p>rating:{rating}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
