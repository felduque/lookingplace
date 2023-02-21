import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import StarRatings from "react-star-ratings";

export default function ModalCommentEdit({ closeModal, idComentario }) {
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

  const handleRating = async () => {
    const response = await axios.patch(
      `http://localhost:3000/comment/rating/${idComentario}`,
      {
        dataBody: rating,
      }
    );
    console.log(response);
  };
  //   http://localhost:3000/comment/edit/:id
  // params id de comentario
  //   comment, property_comment
  const changeRating = (newRating, name) => {
    setRating(newRating);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Califica el Alojamiento</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
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
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={() => {
              Swal.fire({
                title: "Brindando calificacion al alojamiento, continuar?",
                showDenyButton: true,
                confirmButtonText: "Confirmar",
                denyButtonText: `Cancelar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire("Cambios Guardados!", "", "success");
                  handleRating();
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 2500);
                } else if (result.isDenied) {
                  Swal.fire("Cambios no guardados", "", "info");
                }
              });
            }}
          >
            Dar Calificacion
          </button>
          <button className="button" onClick={closeModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
}
