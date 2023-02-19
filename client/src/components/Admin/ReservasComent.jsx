import EditComent from "./Icons/Edit";
import { useState } from "react";
import "./ReservasStyles.css";
import ModalCommentEdit from "./ModalCommentEdit";

export default function ReservasComent({ idPropiedad, clientCom }) {
  console.log(
    "Desde Reservas coment",
    "IDPROP",
    idPropiedad,
    "Son Comentarios",
    clientCom
  );

  const [modalComment, setModalComment] = useState(false);

  const commentProp = clientCom.filter((p) => p.Property?.id === idPropiedad);
  console.log(commentProp);

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
        Tus Comentarios del Alojamiento
      </p>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: "12px",
          padding: "12px",
          margin: "5px auto",
          width: "90%",
        }}
      >
        {commentProp.map((com, i) => {
          let comentarioCodigo = com.id;
          return (
            <div key={com.id}>
              <div>
                <EditComent
                  width="25px"
                  heigth="25px"
                  className="iconoEditComentRes"
                  onClick={(e) => {
                    setModalComment(true);
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "90%",
                    left: "0%",
                    top: "150%",
                    margin: "5px",
                    border: "1px solid black",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <p>{com.comment}</p>
                </div>
                {modalComment && (
                  <ModalCommentEdit
                    closeModal={() => setModalComment(false)}
                    idComentario={comentarioCodigo}
                    idProperty={com.Property.id}
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
