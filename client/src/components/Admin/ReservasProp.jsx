import { useEffect, useState } from "react";
import { getPropertyById } from "./Api";
import { Link } from "react-router-dom";

export default function ReservasProp({ id }) {
  const [propertySearch, setpropertySearch] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      const property = await getPropertyById(id);
      const prop = property.data;
      setpropertySearch(prop);
    };
    fetchProperty();
  }, [id]);

  console.log(propertySearch);
  if (!propertySearch.id) return <div>Cargando...</div>;
  return (
    <div>
      <div className="container-list-publish-tenant__list__item__image">
        <img src={propertySearch.image[0]} alt={propertySearch.title} />
      </div>
      <Link to={`/propertyDetail/${propertySearch.id}`}>
        <h3 className="text-list-publish-title">
          {propertySearch.title
            .slice(0, 22)
            .concat(propertySearch.title.length > 22 ? "..." : "")}
        </h3>
      </Link>
      <p
        className="text-list-publish-data"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {propertySearch.country}
      </p>
    </div>
  );
}
