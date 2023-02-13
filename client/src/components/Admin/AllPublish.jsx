import React, { useEffect, useState } from "react";
import { allPropierties } from "./Api";
import { Link } from "react-router-dom";

export const AllPublish = () => {
  const [allPropiertie, setAllPropiertie] = useState([]);

  useEffect(() => {
    const fetchAllPropierties = async () => {
      const allPropierte = await allPropierties();
      setAllPropiertie(allPropierte.data.result);
    };
    fetchAllPropierties();
  }, []);

  return (
    <div className="container-list-publish-tenant">
      <h2>Todas las publicaciones</h2>
      <div className="content-list-publish-all">
        {allPropiertie.map((item) => {
          return (
            <Link to={`/propertyDetail/${item.id}`}>
              <div
                key={item.id}
                className="container-list-publish-tenant__list__item"
              >
                <div className="container-list-publish-tenant__list__item__image">
                  <img src={item.image[0]} alt={item.title} />
                </div>
                <h3 className="text-list-publish-title">{item.title}</h3>
                <p className="text-list-publish-data">{item.date}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
