import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import StarRatings from "react-star-ratings";
export default function ModalCommentEdit({
  closeModal,
  idPropiedad,
  idCliente,
  emailCliente,
  avatarCliente,
}) {
  const [commentEdit, setCommentEdit] = useState("");
  const [rating, setRating] = useState();
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const handleOnChange = (e) => {
    setCommentEdit(e.target.value);
  };

  console.log(commentEdit);

  const handleCreateNewComment = async () => {
    const response = await axios.post(
      `http://localhost:3000/comment/createcomment`,
      {
        property_comment: idPropiedad,
        author: emailCliente, // email
        avatar: avatarCliente, //,
        client_comment: idCliente,
        comment: commentEdit,
        calificacion: rating,
      }
    );
    console.log(response);
  };

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };
  //   http://localhost:3000/comment/edit/:id
  // params id de comentario
  //   comment, property_comment
  console.log(rating);

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Escribe tu Comentario</p>
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
              placeholder="El alojamiento cumplio mis expectativas ... "
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "18px",
              }}
            >
              <h3>Califica el Alojamiento</h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "18px",
              }}
            >
              <StarRatings
                rating={rating}
                starRatedColor="yellow"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                starHoverColor="rgb(100, 100, 147)"
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={() => {
              Swal.fire({
                title: "Vas a crear un nuevo comentario",
                showDenyButton: true,
                confirmButtonText: "Confirmar",
                denyButtonText: `Cancelar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire("Cambios Guardados!", "", "success");
                  handleCreateNewComment();
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 2500);
                } else if (result.isDenied) {
                  Swal.fire("Cambios no guardados", "", "info");
                }
              });
            }}
          >
            Crear Comentario
          </button>
          <button className="button" onClick={closeModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
}
