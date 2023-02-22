import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyByIdAsync } from "../../redux/features/getPropertySlice";
import { useEffect, useReducer, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Calendar from "../Calendario/Calendario";
import OwnCarousel from "./OwnCarousel";
import CapacityIcon from "./Icons/Capacity";
import BedIcon from "./Icons/Bed";
import BathIcon from "./Icons/Bath";
import StarIcon from "./Icons/Star";
import userIcon from "../../assets/user-default-icon.png";
import "./CardDetail.css";
import "./darkCard.css";
import { getTenantById, getUserById } from "../Admin/Api";
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
  // console.log(detail.Bookings);
  let arrayBookings = [];
  detail.Bookings?.forEach((b) => {
    // console.log(b.bookingsPropCli);
    arrayBookings = arrayBookings.concat(b.bookingsPropCli);
  });
  //console.log(arrayBookings);

  let arrayCalificacion = [];
  detail.Comments?.forEach((c) => {
    if (c.calificacion !== null)
      arrayCalificacion = [...arrayCalificacion, c.calificacion];
  });

  console.log("Soy ArrayCalificacion", arrayCalificacion);

  let promedio =
    arrayCalificacion.reduce(
      (acumulador, currentValue) => acumulador + currentValue,
      0
    ) / arrayCalificacion.length;

  if (promedio % 1 === 0) {
    promedio = promedio + ".0";
  }

  if (isNaN(promedio)) promedio = "0.0";
  console.log(promedio);

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
    type,
  } = detail;

  /*Comentarios*/

  const { auth } = useAuth();
  //console.log(auth);
  const { user } = UserAuth();
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [usersLocal, setUsersLocal] = useState([]);
  const [errMsg, setErrMsg] = useState(null);
  /* edit*/
  const [editComment, setEditComment] = useState({
    commentId: null,
    commentText: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  /*const [replyComment, setReplyComment] = useState({
    commentId: null,
    commentText: "",
  });
  const [isReplying, setIsReplying] = useState(false);*/

  const commentsArray = Comments ? Object.values(Comments) : [];

  useEffect(() => {
    const fetchUsers = async () => {
      const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
      const idClient = storedAuth?.idClient;
      const idTenant = storedAuth?.idTenant;

      if (storedAuth.role === "Client") {
        const usersLocal = await getUserById(idClient);
        setUsersLocal(usersLocal.data);
      } else if (storedAuth.role === "Tenant" || storedAuth.role === "Admin") {
        const usersLocal = await getTenantById(idTenant);
        setUsersLocal(usersLocal.data);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    commentsArray.sort((a, b) => b.id - a.id);
    setComentarios(commentsArray);
  }, [Comments]);

  function reloadPageAndRestoreScrollPosition() {
    const scrollPosition =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    window.location.reload();
    window.addEventListener("load", function () {
      window.scroll(0, scrollPosition);
    });
  }

  const handleEditComment = (id, text) => {
    setEditComment({ commentId: id, commentText: text });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    //setReplyComment({ commentId: null, commentText: "" });
    //setIsReplying(false);
  };
  //console.log(usersLocal);
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
        //console.log(response.data);
        return response.data;
      })
      .then((data) => {
        const updatedComments = comentarios.map((commentId) =>
          commentId === editComment.commentId
            ? { ...comentarios, comment: editComment.commentText }
            : comentarios
        );
        setComentarios(updatedComments.sort((a, b) => a.id - b.id));
        setEditComment({ commentId: null, commentText: "" });
        setIsEditing(false);
        Swal.fire(
          "Tu comentario ha sido modificado con éxito",
          "",
          "success"
        ).then(function () {
          reloadPageAndRestoreScrollPosition();
        });
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fecha = new Date("2023-02-22T00:21:48.544Z");
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const fechaFormateada = fecha.toLocaleString("es-MX", options);

    const comentario = {
      comment: nuevoComentario,
      property_comment: id,
      author: usersLocal?.email || user?.email,
      avatar: usersLocal?.avatar || user?.photoURL,
      fecha: fechaFormateada,
      client_comment: usersLocal?.idClient ? auth?.idClient : null,
      //parent_comment_id: parentCommentId,
    };

    fetch("http://localhost:3000/comment/createcomment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comentario),
    })
      .then((response) => {
        if (response.ok) {
          setComentarios(
            [...comentarios, comentario].sort((a, b) => b.id - a.id)
          );
          setNuevoComentario("");
          //setReplyComment({ commentId: null, commentText: "" });
          //setIsReplying(false);
          Swal.fire(
            "Tu comentario ha sido agregado con éxito",
            "",
            "success"
          ).then(function () {
            reloadPageAndRestoreScrollPosition();
          });
        } else if (response.status === 400) {
          setErrMsg(
            "Solo puedes comentar 1 vez por propiedad, recuerda que tienes la opción de editar tu comentario"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setErrMsg(
          "Hubo un error al enviar el comentario, por favor intenta de nuevo."
        );
      });
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="dark-theme">
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ color: "black" }}>
          <hr />
          <div className="containerTitle">
            <div className="containerTitleUbicacion ">
              <div className="titlePrin title is-4 is-italic ">{title}</div>
              <div className="ubicacionCon title is-6">
                {" "}
                | {typeof country === "string" ? country + "/" : null}
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
                {promedio}/5.0
                <div>
                  <span
                    style={{
                      color: "green",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {arrayCalificacion.length === 0
                      ? "No existen calificaciones"
                      : arrayCalificacion.length > 1
                      ? arrayCalificacion.length + " calificaciones"
                      : arrayCalificacion.length + " calificación"}
                  </span>
                </div>
              </div>
              <div className="title is-6 is-italic">
                <strong className="classMyStrong">$USD {price}</strong> /noche
              </div>
            </div>
          </div>
          <div className="containerImgDes">
            <div className="containerCarousel">
              <OwnCarousel id={id} images={image} />
            </div>
            <div className="cotainerData box has-shadow">
              <div>
                <h3 className="c-title title is-5 is-italic mt-5 my-3 has-text-centered">
                  Descripción
                </h3>
                <p className="c-description title is-6">{description}</p>
              </div>
              <div>
                <h3 className=" c-title title is-5 is-italic mt-0 my-3">
                  Datos Generales
                </h3>
                <p className="c-description title is-6 mt-0 my-4">
                  {type} con alojamiento para {capacity}{" "}
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
                <p className="c-title title is-5 is-italic my-2">
                  {" "}
                  Contamos con los siguientes servicios :{" "}
                </p>
                {services?.map((s, i) => {
                  return (
                    <span className="c-description title is-6 my-2" key={i}>
                      {" "}
                      • {s}{" "}
                    </span>
                  );
                })}
              </div>
              <hr className="c-hr" />
              <div className="reglasHospedador">
                <h3 className="c-title title is-5 my-2 is-italic has-text-centered">
                  <span className="warning-icon">⚠</span> Reglas del Hospedador
                </h3>
                <p className="c-title title is-5 is-italic my-2">
                  {" "}
                  Se permite :{" "}
                </p>
                <p className="c-description title is-6 my-2">
                  {" "}
                  {smoke ? "✔" : "✘"} Fumar
                </p>
                <p className="c-description title is-6 my-2">
                  {" "}
                  {party ? "✔" : "✘"} Fiestas
                </p>
                <p className="c-description title is-6 my-2">
                  {" "}
                  {pets ? "✔" : "✘"} Mascotas
                </p>
                <p className="c-title title is-5 is-italic my-2">
                  {" "}
                  Horarios Entrada/Salida :{" "}
                </p>
                <p className="c-description title is-6 my-2">
                  Hora de Ingreso : {checkIn}
                </p>

                <p className="c-description title is-6 mt-2 my-2">
                  Hora de Salida : {checkOut}
                </p>
                <span className="c-description title is-6 mt-2 my-2">
                  Recuerda llamar a tu hospedador para coordinar la recepción en
                  su hospedaje.
                </span>
                <p className="c-description title is-7 is-italic  my-2 ">
                  Mantegamos la integridad de los servicios prestados,
                  mantengamos una comunidad responsable con los demas.
                </p>
              </div>
            </div>
          </div>
          <hr className="c-hr" />
          <div className="containerCalMap box has-shadow">
            <div className="containerMap">
              <p className="subtitleCardDe c-title title is-5 is-italic">
                Ubicacion del Alojamiento
              </p>
              <p className="c-description title is-6">
                Para una mejor referencia puedes comunicarte con el hospedador
              </p>
              <GoogleMap
                zoom={12}
                center={{ lat, lng }}
                mapContainerStyle={{
                  height: "400px",
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid blue",
                  margin: "42px",
                }}
              >
                {lat && lng && <Marker position={{ lat, lng }} />}
              </GoogleMap>
            </div>
            <div className="containerCalendar">
              <p className="subtitleCardDe c-title title is-5 is-italic">
                Calendario de Disponibilidad
              </p>
              <p className="c-description title is-6">
                Verifica en el calendario la disponibilidad del alojamiento.
              </p>
              <div className="content">
                <Calendar
                  propId={id}
                  bookings={arrayBookings}
                  price={price}
                  title={title}
                  description={description}
                  url={image}
                />
              </div>
            </div>
          </div>
          <hr className="c-hr" />
          <div className="container-sup-comment ">
            <div className="containerComents">
              <div className="title-comment">
                <div className="subtitleCardDe c-title title is-5 is-italic">
                  Comentarios
                </div>
              </div>

              {usersLocal?.email ||
              user?.email ||
              usersLocal.role === "Admin" ? (
                <div className="c-avatar-input">
                  {errMsg && <p className="errComment">{errMsg}</p>}
                  <form className="c-form" onSubmit={handleSubmit}>
                    <div className="avatar-input">
                      <div className="c-avatar">
                        {usersLocal?.avatar ? (
                          <img class="c-avatar-img" src={usersLocal?.avatar} />
                        ) : (
                          <img src={userIcon} width="50" height="50" />
                        )}
                      </div>
                      <div className="c-input">
                        <textarea
                          className="c-textarea is-primary is-info c-description title is-6"
                          value={nuevoComentario}
                          onChange={(event) =>
                            setNuevoComentario(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="c-button">
                      <button type="submit">Comentario</button>
                    </div>
                  </form>
                </div>
              ) : (
                <Link to="/register" className="button is-primary">
                  <strong>Registrarse</strong>
                </Link>
              )}
              <div className="container-cards-comment">
                {commentsArray.length > 0 ? (
                  <div className="comment">
                    {commentsArray
                      .map((comentario) => (
                        <div
                          key={comentario.id}
                          id={`comentario-${comentario.id}`}
                          className="comment-container title is-5"
                        >
                          {usersLocal?.email === comentario.author ||
                          user?.email === comentario.author ||
                          usersLocal?.role == "Admin" ? (
                            <button
                              onClick={() => deleteComment(comentario.id)}
                              className="delete-button"
                            >
                              ❌
                            </button>
                          ) : (
                            ""
                          )}
                          {usersLocal?.email === comentario.author ||
                          user?.email === comentario.author ||
                          usersLocal?.role === "Admin" ? (
                            <div>
                              {isEditing &&
                              editComment.commentId === comentario.id ? (
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
                                  <button type="button" onClick={handleCancel}>
                                    Cancelar
                                  </button>
                                </form>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleEditComment(
                                      comentario.id,
                                      comentario.comment
                                    )
                                  }
                                  className="response-button"
                                >
                                  📝
                                </button>
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="c-avatar-author-comment">
                            {usersLocal?.email === comentario.author &&
                            usersLocal?.avatar !== comentario.avatar ? (
                              <img
                                className="imgComment"
                                src={usersLocal.avatar}
                                width="50"
                                height="50"
                              />
                            ) : user?.email === comentario.author &&
                              user?.providerData[0]?.photoURL !==
                                comentario.avatar ? (
                              <img
                                className="imgComment"
                                src={user.providerData[0]?.photoURL}
                                width="50"
                                height="50"
                              />
                            ) : (
                              <img
                                className="imgComment"
                                src={comentario.avatar}
                                width="50"
                                height="50"
                              />
                            )}
                            <div className="c-author-fecha">
                              <p className="authorComment">
                                {comentario.author}
                              </p>
                              <p className="commentFecha">
                              {new Date(comentario.fecha).toLocaleString(
                                  "es-MX",
                                  {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <h1 className="comentarioComment c-description title is-6">
                            {comentario.comment}
                          </h1>
                        </div>
                      ))
                      .sort((a, b) => b.id - a.id)}
                  </div>
                ) : (
                  <div>
                    <span className="c-description title is-6">No existen comentarios para esta publicación</span>
                  </div>
                )}
              </div>
            </div>
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
