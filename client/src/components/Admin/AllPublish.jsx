import React, { useEffect, useState } from "react";
import { allPropierties, deleteProperty } from "./Api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ModalComments } from "./ModalComments";
import { AiOutlineComment } from "react-icons/ai";

export const AllPublish = () => {
  const [allPropiertie, setAllPropiertie] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const fetchAllPropierties = async () => {
      const allPropierte = await allPropierties();
      setAllPropiertie(allPropierte.data.result);
    };
    fetchAllPropierties();
  }, [allPropiertie.length]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(id);
        setAllPropiertie(allPropiertie.filter((item) => item.id !== id));
        Swal.fire("Borrado!", "Tu selección ha sido borrada.", "success");
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
    <div className="title is-4 space-all-post-title">Todas las publicaciones</div>
      <div className="container-list-publish-tenant">
        
        <div className="container-list-publish-tenant__search">
          <input
            type="text"
            className="input is-rounded is-info"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="content-list-publish-all">
          {allPropiertie
            .filter((val) => {
              if (search === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item) => {
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
                    <div class="comments-button-allpublish">
                    <button
                      onClick={() => {
                        setId(item.id);
                        handleChangeModal();
                      }}
                      className="btn-edit-publish"
                    >💬</button>
                    </div>
                    </div>
                 </div>

                  <Link to={`/propertyDetail/${item.id}`}>
                    <div className="container-list-publish-tenant__list__item__image">
                      <img src={item.image[0]} alt={item.title} />
                    </div>
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
      </div>
      {modal && <ModalComments id={id} />}
    </>
  );
};
