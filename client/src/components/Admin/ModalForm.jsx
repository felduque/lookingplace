import React, { useState } from "react";
import "./ModalForm.css";
import { updatePropery } from "./Api";
import { RiCloseCircleLine } from "react-icons/ri";
import Swal from "sweetalert2";
export const ModalForm = (props) => {
  const [modal, setModal] = useState(true);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  console.log(props);
  const { id } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estas seguro de editar esta propiedad?",
      text: "Podria afectar la forma en que te buscan tus clientes",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar",
    }).then((result) => {
      if (result.isConfirmed) {
        updatePropery(id, data);
        //  dejar todos los campos vacios
        setData({
          title: "",
          description: "",
        });
        setModal(false);
        Swal.fire("Editado!", "La propiedad ha sido editada.", "success");
      }
    });
  };

  const handleModal = () => {
    if (modal === true) {
      setModal(false);
    }
  };

  if (!modal) return null;
  return (
    <form onSubmit={handleSubmit} className="modal-container-form">
      <div className="modal-container-inputs">
        <div className="content-modal-form-button">
          <RiCloseCircleLine
            className="modal-container-form-close"
            onClick={handleModal}
          />
        </div>
        <h2>Los campos que no quieras modificar dejalos vacios</h2>
        <div className="modal-container-form-input">
          <label htmlFor="name">Editar Titulo</label>
          <input
            onChange={(e) => setData({ ...data, title: e.target.value })}
            type="text"
            name="title"
          />
        </div>
        <div className="modal-container-form-input">
          <label htmlFor="description">Editar descripcion</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
        </div>
        <button onClick={handleSubmit} type="submit">
          Editar
        </button>
      </div>
    </form>
  );
};