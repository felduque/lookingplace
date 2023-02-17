/*import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsAsync } from "../../redux/features/getPropertySlice";

export default function Comments() {
  const dispatch = useDispatch();
  const allComments = useSelector((state) => state.properties.allComments);

  useEffect(() => {
    dispatch(getCommentsAsync("http://localhost:3000/comments"));
  }, [dispatch]);

  return (
    <div>
      <h2>Comentarios</h2>
      {allComments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.title}</h3>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}
*/
/*Este componente utiliza el action creator getCommentByIdAsync para obtener un comentario específico utilizando el commentId que se pasa como una propiedad al componente. El comentario se almacena en la propiedad commentDetail del estado de Redux y se renderiza en la pantalla.*/

/*? (
  <div>
    {!auth.email ? (
      commentsArray.map((comentario) => (
        <div key={comentario.id}>
          <div>
            <p>
              {
                <img
                  src="https://img.asmedia.epimg.net/resizer/lOsBquRkmQ0wwhs_Vda4olIUINM=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/ZD6DKSW2NFKNFN2UYVVA4C6G6E.jpg"
                  width="50px"
                />
              }
            </p>
            <p>{comentario.fecha.toString()}</p>
            <p>{comentario.comment}</p>

            <h1>
              Para poder responder este comentario debes registrarte
            </h1>
            <hr />
          </div>
        </div>
      ))
    ) : auth.email ? (
      commentsArray.map((comentario) => (
        <div key={comentario.id}>
          <div>
            <p>{comentario.comment}</p>
            <p>{comentario.fecha.toString()}</p>
            {<p>{<img src={auth.avatar} width="50px" />}</p>}
            <hr />
            <button onClick={() => handleDeleteComment(comentario.id)}>
              Borrar
            </button>
          </div>
        </div>
      ))
    ) : user.email ? (
      commentsArray.map((comentario) => (
        <div key={comentario.id}>
          <div>
            <p>{comentario.comment}</p>
            <p>{comentario.fecha.toString()}</p>
            {
              <p>
                {
                  <img
                    src="https://lh3.googleusercontent.com/a/AEdFTp4bQqCFbgkWqz7UpKcS2-zVux1LuKUxovQ8Efi3=s96-c"
                    width="50px"
                  />
                }
              </p>
            }
            <hr />
          </div>
        </div>
      ))
    ) : (
      <div></div>
    )}
  </div>
) */

/*const currentUser = getCurrentUser(); // función que devuelve el usuario actual
const comentariosArray = comentarios ? Object.values(comentarios) : [];

return (
  <div>
    {comentariosArray.map((comment) => (
      <div key={comment.id}>
        <p>{comment.text}</p>
        {currentUser.id === comment.user_id || currentUser.is_admin ? (
          <button onClick={() => handleDeleteComment(comment.id)}>
            Borrar
          </button>
        ) : null}
      </div>
    ))}
  </div>
);*/
