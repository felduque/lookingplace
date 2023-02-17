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
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(id);
        setAllPropiertie(allPropiertie.filter((item) => item.id !== id));
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
    <>
      <div className="container-list-publish-tenant">
        <h2>Todas las publicaciones</h2>
        <div className="container-list-publish-tenant__search">
          <input
            type="text"
            className="input-list-publish-tenant"
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
                  <div className="container-list-publish-tenant__list__item__delete">
                    <button
                      className="btn-delete-publish"
                      onClick={() => handleDelete(item.id)}
                    >
                      X
                    </button>
                  </div>
                  <AiOutlineComment
                    onClick={() => {
                      setId(item.id);
                      handleChangeModal();
                    }}
                    className="btn-edit-publish"
                  />

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
