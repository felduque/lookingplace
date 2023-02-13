import React, { useEffect, useState } from "react";
import { getTenantById } from "./Api";
import { Link } from "react-router-dom";

export const ListPublish = () => {
  const [allPropiertie, setAllPropiertie] = useState([]);

  useEffect(() => {
    const fetchAllPropierties = async () => {
      const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
      const idTenant = storedAuth?.idTenant;
      if (storedAuth.role === "Tenant" || storedAuth.role === "Admin") {
        const allPropierte = await getTenantById(idTenant);
        const prop = allPropierte.data.Properties;
        setAllPropiertie(prop);
      } else {
        alert(
          "No tienes propiedades publicadas o No cuentas con permisos necesarios"
        );
      }
    };
    fetchAllPropierties();
  }, []);

  console.log(allPropiertie);

  return (
    <div className="container-list-publish-tenant">
      <h2>Tus Propiedades</h2>
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
                <p className="text-list-publish-data">{item.country}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
