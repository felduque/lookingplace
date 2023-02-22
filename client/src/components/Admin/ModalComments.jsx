import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { GrClearOption } from "react-icons/gr";
import "./ModalComment.css";
import { getPropertyByid, deleteComment } from "./Api";
import { useEffect } from "react";
import Swal from "sweetalert2";
export const ModalComments = ({ id }) => {
  const [modal, setModal] = useState(true);
  const [comments, setComments] = useState([]);

  const handleModal = () => {
    if (modal === true) {
      setModal(false);
    }
  };

  useEffect(() => {
    getPropertyByid(id).then((res) => {
      setComments(res?.data?.Comments);
    });
  }, [id]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Ests seguro de eliminar el comentario?",
      text: "No podrs revertir esta accin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(id).then((res) => {
          if (res?.status === 200) {
            Swal.fire("Eliminado!", "El comentario fue eliminado", "success");
            setComments(comments.filter((comment) => comment.id !== id));
          }
        });
      }
    });
  };

  if (!modal) return null;
  return (
    <div className="modal-container-comments">
      <div className="modal-container-desing-comments">
        <div className="content-modal-form-button">
          <RiCloseCircleLine
            className="modal-container-form-close"
            onClick={handleModal}
          />
        </div>
        <div className="content-comment-property">
          {comments ? (
            comments.map((comment) => (
              <div key={comment.id} className="container-comment">
                <div className="content-comment-user">
                  <p className="content-comment-user-name">Usuario</p>
                  <GrClearOption
                    className="content-comment-user-delete"
                    onClick={() => handleDelete(comment.id)}
                  />
                </div>
                <div className="content-comment-user">
                  <p className="content-comment-user-comment">
                    {comment?.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay comentarios</p>
          )}
        </div>
      </div>
    </div>
  );
};
