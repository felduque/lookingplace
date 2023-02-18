import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyByIdAsync } from "../../redux/features/getPropertySlice";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Calendar from "../Calendario/Calendario";
import OwnCarousel from "./OwnCarousel";
import CapacityIcon from "./Icons/Capacity";
import BedIcon from "./Icons/Bed";
import BathIcon from "./Icons/Bath";
import StarIcon from "./Icons/Star";
import "./CardDetail.css";

import useAuth from "../Acceso/hooks/useAuth";
import axios from "axios";
import { UserAuth } from "../../service/AuthContext";
import Swal from "sweetalert2";

import Loader from "../Loader/Loader";

export default function CardDetail() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDrViDX9rfRwIuHnmg19Ss7qT9UgIwD_Ok",
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertyByIdAsync(id));
  }, [id, dispatch]);

  const detail = useSelector((state) => state.properties.propertyDetail);
  //console.log(detail);

  const {
    title,
    description,
    checkIn,
    checkOut,
    capacity,
    beds,
    baths,
    services,
    smoke,
    party,
    pets,
    price,
    image,
    rating,
    lat,
    lng,
    bookings,
    Comments,
    Tenant,
    Client,
    country,
    region,
    state,
  } = detail;

  /* David */

  //const comentariosArray = comentarios ? Object.values(comentarios) : [];
  //console.log(typeof comentarios);
  //console.log(comentarios);
  /*const handleDeleteComment = (id) => {
axios
  .delete(`http://localhost:3000/comment/delete/${id}`)
  .then((response) => {
    if (response.status === 200) {
      const deletedComments = comentarios
      .map((comentario) => comentario.id)
      .filter((c) => c.id !== id);
      setComentarios(deletedComments);
    }
  })
  .catch((error) => console.log(error));
};*/
  //console.log(Tenant);
  /*useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comments");
        if (Array.isArray(response.data)) {
          const comentarios = response.data.map((comentario) => {
            const fecha = comentario.fecha ? new Date(comentario.fecha) : "";
            return { ...comentario, fecha };
          });
          setComentarios(comentarios);
        } else if (
          typeof response.data === "object" &&
          response.data !== null
        ) {
          const comentarios = Object.keys(response.data).map((key) => {
            const comentario = response.data[key];
            const fecha = comentario.fecha ? new Date(comentario.fecha) : "";
            return { ...comentario, fecha };
          });
          setComentarios(comentarios);
        } else {
          console.log("Response data is not an array or object.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComentarios();
  }, []);*/

  const { auth } = useAuth();
  const { user } = UserAuth();
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  /* edittttttttt*/
  const [editComment, setEditComment] = useState({
    commentId: null,
    commentText: "",
  });

  const handleEditComment = (id, text) => {
    setEditComment({ commentId: id, commentText: text });
  };

  const handleUpdateComment = (event) => {
    event.preventDefault();

    const editCommento = {
      comment: editComment.commentText,
    };

    axios
      .patch(
        `http://localhost:3000/comment/edit/${editComment.commentId}`,
        editCommento
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((data) => {
        const updatedComments = comentarios.map((commentId) =>
          commentId === editComment.commentId
            ? { ...comentarios, comentarios: editComment.commentText }
            : comentarios
        );
        setComentarios(updatedComments);
        setEditComment({ commentId: null, commentText: "" });
      })
      .catch((error) => console.log(error));
  };

  console.log(editComment);

  /* Agregar comentario*/

  console.log(detail);

  const commentsArray = Comments ? Object.values(Comments) : [];

  //console.log(commentsArray);

  const handleSubmit = (event) => {
    event.preventDefault();
    const fecha = new Date();

    const comentario = {
      comment: nuevoComentario,
      property_comment: id,
      author: auth.email,
      avatar: auth.avatar,
      fecha: fecha,
    };

    fetch("http://localhost:3000/comment/createcomment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comentario),
    })
      .then((response) => {
        if (response.ok) {
          setComentarios([...comentarios, comentario]);
          setNuevoComentario("");
          commentsArray;
          Swal.fire(
            "Tu comentario ha sido agregado con éxito, recargue la página para verlo reflejado",
            "",
            "success"
          );
        }
      })
      .catch((error) => console.log(error));
  };

  function deleteComment(id) {
    fetch(`http://localhost:3000/comment/delete/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          // Si la respuesta del servidor es satisfactoria, eliminamos el comentario de la página
          const commentElement = document.getElementById(`comentario-${id}`);
          commentElement.remove();
        } else {
          console.error(`Error al borrar comentario: ${response.status}`);
        }
      })
      .catch((error) => console.error(`Error al borrar comentario: ${error}`));
  }

  // console.log(typeof lat);
  // if (!Calendar) return <div>Cargando Calendario</div>;
  // if (!isLoaded) return <div>Loading...</div>;
  // if (!detail) return <div>Loading...</div>

  // if (!Calendar || !isLoaded || !detail) {
  //   return <Loader />
  // }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2800);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ color: "black" }}>
          <hr />
          <div className="containerTitle">
            <div className="containerTitleUbicacion">
              <div className="titlePrin">{title}</div>
              <div className="ubicacionCon">
                {typeof country === "string" ? country + "/" : null}
                {typeof region === "string" ? region + "/" : null}
                {typeof state === "string" ? state : null}
              </div>
            </div>
            <div className="iconsRes">
              <div className="iconsMyClass">
                <CapacityIcon width="35px" height="35px"></CapacityIcon>
                {capacity}
                <BedIcon width="35px" height="35px"></BedIcon>
                {beds}
                <BathIcon width="35px" height="35px"></BathIcon>
                {baths}
                <StarIcon width="35px" height="35px"></StarIcon>
                {rating}
              </div>
              <div className="precio">
                <strong className="classMyStrong">$USD {price}</strong> noche
              </div>
            </div>
          </div>
          <div className="containerImgDes">
            <div className="containerCarousel">
              <OwnCarousel id={id} images={image} />
            </div>
            <div className="cotainerData">
              <div>
                <h3 className="subtitleCardDe">Descripción</h3>
                <p>{description}</p>
              </div>
              <div>
                <h3 className="subtitleCardDe">Datos Generales</h3>
                <p>
                  Alojamiento para {capacity}{" "}
                  {capacity > 1 ? "personas" : "persona"}, cuenta con {beds}{" "}
                  {beds > 1 ? "camas" : "cama"} y {baths}{" "}
                  {baths > 1 ? "baños" : "baño"}.
                </p>
                {/* <p>
              Capacidad : {capacity} {capacity > 1 ? "personas" : "persona"}
            </p>
            <p>
              {beds} {beds > 1 ? "camas" : "cama"}
            </p>
            <p>
              {baths} {baths > 1 ? "baños" : "baño"}
            </p> */}
                <p className="subTitleData">
                  {" "}
                  Contamos con los siguientes servicios :{" "}
                </p>
                {services?.map((s, i) => {
                  return <span key={i}> • {s} </span>;
                })}
                <p className="subTitleData"> Se permite : </p>
                <p> {smoke ? "✔" : "✘"} Fumar</p>
                <p> {party ? "✔" : "✘"} Fiestas</p>
                <p> {pets ? "✔" : "✘"} Mascotas</p>
              </div>
              <div>
                <h3 className="subtitleCardDe">Reglas del Hospedador</h3>
                <p className="subTitleData">Hora de Ingreso : {checkIn}</p>

                <p className="subTitleData">Hora de Salida : {checkOut}</p>
                <span>
                  Recuerda llamar a tu hospedador para coordinar la recepción en
                  su hospedaje.
                </span>
              </div>
              <p className="infoD">
                Mantegamos la integridad de los servicios prestados, mantengamos
                una comunidad responsable con los demas.
              </p>
            </div>
          </div>
          <hr />
          <div className="containerCalMap">
            <div className="containerMap">
              <p className="subtitleCardDe">Ubicacion del Alojamiento</p>
              <p className="">
                Para una mejor referencia puedes comunicarte con el hospedador
              </p>
              <GoogleMap
                zoom={12}
                center={{ lat, lng }}
                mapContainerStyle={{
                  height: "550px",
                  width: "100%",
                }}
              >
                {lat && lng && <Marker position={{ lat, lng }} />}
              </GoogleMap>
            </div>
            <div className="containerCalendar">
              <p className="subtitleCardDe">Calendario de Disponibilidad</p>
              <p>
                Verifica en el calendario la disponibilidad del alojamiento.
              </p>
              <div className="content">
                <Calendar
                  propId={id}
                  bookings={bookings}
                  price={price}
                  title={title}
                  description={description}
                  url={image}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="containerComents">
            <div className="subtitleCardDe">Comentarios</div>
            {auth?.email ? (
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Nuevo comentario</label>
                  <input
                    className="hola"
                    type="text"
                    value={nuevoComentario}
                    onChange={(event) => setNuevoComentario(event.target.value)}
                  />

                  <button type="submit">Enviar comentario</button>
                </form>
              </div>
            ) : (
              <h1>Debes Registrarte Para poder comentar</h1>
            )}
            <form onSubmit={handleUpdateComment}>
              <input
                type="text"
                placeholder="Editar comentario"
                value={editComment.commentText}
                onChange={(event) =>
                  setEditComment({
                    ...editComment,
                    commentText: event.target.value,
                  })
                }
              />
              <button type="submit">Guardar cambios</button>
            </form>
            {commentsArray.length > 0 ? (
              <div className="comment">
                {commentsArray.map((comentario) => (
                  <div
                    key={comentario.id}
                    id={`comentario-${comentario.id}`}
                    className="comment-container"
                  >
                    {auth?.email === Tenant?.email || auth?.role == "Admin" ? (
                      <button
                        onClick={() => deleteComment(comentario.id)}
                        className="delete-button"
                      >
                        Eliminar
                      </button>
                    ) : (
                      ""
                    )}
                    {<button className="response-button">Editar</button>}
                    <button
                      onClick={() =>
                        handleEditComment(comentario.id, comentario.comment)
                      }
                    >
                      Editar
                    </button>

                    <p className="commentFecha">
                      {comentario.fecha?.toString()}
                    </p>
                    <hr />
                    <img
                      className="imgComment"
                      src={comentario.avatar}
                      width="50"
                      height="50"
                    />

                    <p className="authorComment">{comentario.author}</p>
                    <h1 className="comentarioComment">{comentario.comment}</h1>

                    <hr />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <span>No existen comentarios para esta publicación</span>
              </div>
            )}
          </div>
          {/* <h1 className="title box is-size-1 has-background-dark has-text-centered is-capitalized has-text-white">
        {title}
      </h1>
      <p className="has-text-centered "> Calificacion : {rating}</p>
      <div className="box">
        <OwnCarousel id={id} images={image} />
      </div>

      <p className="box is-size-3 has-text-white has-background-grey-light has-text-centered">
        {description}
      </p> */}

          {/* <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child notification has-background-light">
                <p className="title has-text-centered">Información General</p>
                <p className="subtitle">
                  {" "}
                  Capacidad para : {capacity} personas
                </p>
                <p className="subtitle"> Contamos con {beds} camas</p>
                <p className="subtitle"> Contamos con {baths} baños</p>
                <p className="subtitle">
                  {" "}
                  Contamos con los siguientes servicios :{" "}
                </p>
                {services?.map((s, i) => {
                  return <span key={i}> - {s}</span>;
                })}
                <p> Se permite fumar : {smoke ? "Si" : "No"}</p>
                <p> Se permite fiestas : {party ? "Si" : "No"}</p>
                <p> Se permite mascotas : {pets ? "Si" : "No"}</p>
              </article>
              <article className="tile is-child notification has-background-light">
                <p className="title has-text-centered">
                  Reglas de la Hospedador
                </p>
                <p className="subtitle">Hora de Ingreso : {checkIn}</p>
                <span>
                  Recuerda llamar a tu hospedador para coordinar la recepción en
                  su hospedaje
                </span>
                <p className="subtitle">Hora de Salida : {checkOut}</p>
                <span>
                  Mantegamos la integridad de los servicios prestados,
                  mantengamos una comunidad responsable con los demas
                </span>
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification has-background-light">
                <p className="title has-text-centered">
                  Ubicacion del Alojamiento
                </p>
                <p className="subtitle">
                  Para una mejor referencia puedes comunicarte con el hospedador
                </p>
                <div className="content">
                  <GoogleMap
                    zoom={12}
                    center={{ lat, lng }}
                    mapContainerStyle={{
                      height: "550px",
                      width: "100%",
                    }}
                  >
                    {lat && lng && <Marker position={{ lat, lng }} />}
                  </GoogleMap>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification has-background-light">
            <div className="content">
              <p className="title has-text-centered">
                Calendario de Disponibilidad
              </p>
              <div className="content">
                <Calendar propId={id} bookings={bookings} price={price} />
              </div>
            </div>
          </article>
        </div>
      </div> */}
          <hr />
        </div>
      )}
    </div>
  );
}
