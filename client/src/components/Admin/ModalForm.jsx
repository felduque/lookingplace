import React, { useState } from "react";
import "./ModalForm.css";
import { updatePropery } from "./Api";
import { RiCloseCircleLine } from "react-icons/ri";
import { getPropertyByid } from "./Api";
import Swal from "sweetalert2";
import { useEffect } from "react";
export const ModalForm = (props) => {
  const [modal, setModal] = useState(true);
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const { id } = props;

  useEffect(() => {
    getPropertyByid(id).then((res) => {
      setData({
        title: res.data.title,
        description: res.data.description,
      });
    });
  }, [id]);

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro de editar esta propiedad?",
      text: "Podría afectar la forma en que te buscan tus clientes",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updatePropery(id, data);
        //  dejar todos los campos vacios
        setData({
          title: "",
          description: "",
        });
        setModal(false);
        Swal.fire("Cambios con éxito", "La propiedad ha sido editada.", "success");
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
        <div className="title is-4">Los campos que no quieras modificar déjalos vacíos</div>
        <div className="title-edit-content">
          <label className="title is-5">Editar título</label>
          <p><input
            onChange={(e) => setData({ ...data, title: e.target.value })}
            value={data.title}
            type="text"
            name="title"
            className="input"
          /></p>
        </div>
        <div>
          <label className="title is-5">Editar descripción</label>
          <p><textarea
            name="description"
            value={data.description}
            cols="30"
            rows="10"
            className="textarea is-hovered has-fixed-size"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea></p>

        </div>
        <button onClick={handleSubmit} type="submit" className="button is-success">
          Editar
        </button>
      </div>
    </form>
  );
};
