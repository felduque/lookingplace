import EditComent from "./Icons/Edit";
import DeleteIcon from "./Icons/DeleteComent";
import { useState } from "react";
import "./ReservasStyles.css";
import ModalCommentEdit from "./ModalCommentEdit";
import Swal from "sweetalert2";
import axios from "axios";
import ModalNewComment from "./ModalNewComment";
import ModalCalificacion from "./ModalCalificacion";

export default function ReservasComent({
  idPropiedad,
  clientCom,
  idCliente,
  avatarCliente,
  emailCliente,
}) {
  console.log(
    "Desde Reservas coment",
    "IDPROP",
    idPropiedad,
    "Son Comentarios",
    clientCom
  );

  const [modalComment, setModalComment] = useState(false);
  const [modalNewComment, setModalNewComment] = useState(false);
  const [modalCalificacion, setModalCalificacion] = useState(false);

  const handleDeleteComment = (id) => {
    axios.delete(`http://localhost:3000/comment/delete/${id}`);
  };

  const commentProp = clientCom.filter((p) => p.Property?.id === idPropiedad);
  console.log(commentProp);
  if (commentProp.length === 0) {
    return (
      <div style={{ margin: "10px" }}>
        <hr
          style={{
            margin: "10px",
          }}
        />
        <p
          style={{
            color: "rgb(2, 255, 175)",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "0",
            margin: "0",
            textAlign: "center",
          }}
        >
          Aun no has comentado tu estancia
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              borderRadius: "12px",
              padding: "5px",
              height: "35px",
            }}
            className="button is-info mt-3"
            onClick={(e) => {
              setModalNewComment(true);
            }}
          >
            Comentar Estancia
          </button>
        </div>

        {modalNewComment && (
          <ModalNewComment
            idPropiedad={idPropiedad}
            closeModal={() => setModalNewComment(false)}
            avatarCliente={avatarCliente}
            emailCliente={emailCliente}
            idCliente={idCliente}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ margin: "5px" }}>
      <hr
        style={{
          margin: "5px",
        }}
      />
      <p
        style={{
          color: "rgb(2, 255, 175)",
          fontSize: "18px",
          fontWeight: "bold",
          padding: "0",
          margin: "0",
          textAlign: "center",
        }}
      >
        Tus Comentarios del Alojamiento
      </p>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: "12px",
          padding: "5px",
          margin: "2px auto",
          width: "98%",
        }}
      >
        {commentProp.map((com, i) => {
          let comentarioCodigo = com.id;
          return (
            <div key={com.id}>
              <div className="containerCommentPanel">
                <EditComent
                  width="20px"
                  heigth="20px"
                  className="iconoEditComentRes"
                  onClick={(e) => {
                    setModalComment(true);
                  }}
                />
                <DeleteIcon
                  width="20px"
                  heigth="20px"
                  className="iconoDeleteComentRes"
                  onClick={(e) => {
                    Swal.fire({
                      title: "Eliminar Comentario?",
                      showDenyButton: true,
                      confirmButtonText: "Confirmar",
                      denyButtonText: `Cancelar`,
                      reverseButtons: true,
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        Swal.fire("Comentario Eliminado", "", "success");
                        handleDeleteComment(com.id);
                        setTimeout(() => {
                          window.location.reload(false);
                        }, 2500);
                      } else if (result.isDenied) {
                        Swal.fire("Cambios No Aplicados", "", "info");
                      }
                    });
                  }}
                ></DeleteIcon>

                <div
                  style={{
                    // position: "relative",
                    width: "100%",
                    // border: "1px solid black",
                    borderRadius: "10px",
                    height: "auto",
                  }}
                >
                  <span
                    style={{
                      width: "250px",
                      height: "150px",
                    }}
                  >
                    {com.comment}
                  </span>
                </div>
                {modalComment && (
                  <ModalCommentEdit
                    closeModal={() => setModalComment(false)}
                    idComentario={comentarioCodigo}
                    idProperty={com.Property.id}
                  />
                )}
              </div>
              <div>
                <button
                  className="button is-primary m-5 is-4"
                  onClick={(e) => {
                    setModalCalificacion(true);
                  }}
                >
                  Calificar Alojamiento
                </button>
                {modalCalificacion && (
                  <ModalCalificacion
                    idComentario={comentarioCodigo}
                    closeModal={() => setModalCalificacion(false)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
