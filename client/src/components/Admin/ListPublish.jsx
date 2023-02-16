import React, { useEffect, useState } from "react";
import { deleteProperty, getTenantById } from "./Api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { RiEditBoxFill } from "react-icons/ri";
import { ModalForm } from "./ModalForm";

export const ListPublish = () => {
  const [allPropiertie, setAllPropiertie] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);

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
  }, [allPropiertie.length]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(id);
        Swal.fire("Borrado!", "Tu archivo ha sido borrado.", "success");
      }
    });
  };

  const handleChangeModal = () => {
    if (modal === true) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  return (
    <div className="container-list-publish-tenant">
      <h2>Tus Propiedades</h2>
      <div className="content-list-publish-all">
        {allPropiertie.map((item) => {
          return (
            <div
              key={item.id}
              className="container-list-publish-tenant__list__item"
            >
              <div className="container-list-publish-tenant__list__item__delete">
                <button
                  className="btn-delete-publish"
                  onClick={() => handleDelete(item.id)}
                >
                  X
                </button>
              </div>
              {/* <div className="container-list-publish-tenant__list__item__edit">
                
              </div> */}

              <div className="container-list-publish-tenant__list__item__image">
                <button
                  // activar funcion y setear el id de la propiedad
                  onClick={() => {
                    handleChangeModal();
                    setId(item.id);
                  }}
                  className="btn-edit-publish"
                >
                  <RiEditBoxFill />
                </button>
                <img src={item.image[0]} alt={item.title} />
              </div>
              <Link to={`/propertyDetail/${item.id}`}>
                <h3 className="text-list-publish-title">
                  {item.title
                    .slice(0, 22)
                    .concat(item.title.length > 22 ? "..." : "")}
                </h3>
              </Link>
              <p className="text-list-publish-data">{item.country}</p>
            </div>
          );
        })}
      </div>
      {/* se manda el id por prop */}
      {modal && <ModalForm id={id} />}
    </div>
  );
};
