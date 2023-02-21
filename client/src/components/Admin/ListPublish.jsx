import React, { useEffect, useState } from "react";
import { deleteProperty, getTenantById } from "./Api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GrEdit } from "react-icons/gr";
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
      text: "No podrás revertir esto",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(id);
        Swal.fire("Borrado!", "Tu selección ha sido eliminada.", "success");
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
  <>
    <div className="title is-4 space-all-post-title">Tus propiedades publicadas</div>
    <div className="container-list-publish-tenant">
      <div className="content-list-publish-all">
        {allPropiertie.map((item) => {
          return (
            <div
              key={item.id}
              className="container-list-publish-tenant__list__item"
            >
            <div className="columns">
              
              <div className="column">
              <div className="container-list-publish-tenant__list__item__delete">
              
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete-button"
                  >
                    ❌
                  </button>
                  
              </div>
              </div>

              <div className="column">
              {/* <div className="container-list-publish-tenant__list__item__edit">
                
              </div> */}
              <div className="container-list-publish-tenant__list__item__image">
                

                 <button
                    onClick={() => {
                      setId(item.id);
                      handleChangeModal();
                    }}
                    className="btn-edit-publish"
                    >
                      📝
                  </button>


                  </div>
                </div>
              </div>
              <div className="container-list-publish-tenant__list__item__image">
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
    </>
  );
};
