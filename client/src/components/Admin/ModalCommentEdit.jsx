import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ModalCommentEdit({
  closeModal,
  idComentario,
  idProperty,
}) {
  console.log(idComentario, idProperty);
  const [commentEdit, setCommentEdit] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    console.log(idComentario);

    const getComment = async () => {
      let res = await axios(`http://localhost:3000/comment/${idComentario}`);
      setCommentEdit(res.data.data.comment);
    };
    getComment();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [idComentario]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const handleOnChange = (e) => {
    setCommentEdit(e.target.value);
  };

  console.log(commentEdit);

  const handleSaveNewComment = async () => {
    const response = await axios.patch(
      `http://localhost:3000/comment/edit/${idComentario}`,
      {
        comment: commentEdit,
        property_comment: idProperty,
      }
    );
    console.log(response);
  };
  //   http://localhost:3000/comment/edit/:id
  // params id de comentario
  //   comment, property_comment

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edita tu Comentario</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div
            style={{
              width: "100%",
            }}
          >
            <input
              style={{
                width: "100%",
                borderRadius: "12px",
                padding: "10px",
              }}
              type="text"
              value={commentEdit}
              onChange={handleOnChange}
            />
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={() => {
              Swal.fire({
                title: "Estas modificando tu comentario, continuar?",
                showDenyButton: true,
                confirmButtonText: "Confirmar",
                denyButtonText: `Cancelar`,
                reverseButtons: true,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire("Cambios Guardados!", "", "success");
                  handleSaveNewComment();
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 2500);
                } else if (result.isDenied) {
                  Swal.fire("Cambios no guardados", "", "info");
                }
              });
            }}
          >
            Guardar Cambios
          </button>
          <button className="button" onClick={closeModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
}
