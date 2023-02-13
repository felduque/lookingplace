import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyByIdAsync } from "../../redux/features/getPropertySlice";
import { useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Calendar from "../Calendario/Calendario";
import OwnCarousel from "./OwnCarousel";
import CapacityIcon from "./Icons/Capacity";
import BedIcon from "./Icons/Bed";
import BathIcon from "./Icons/Bath";
import StarIcon from "./Icons/Star";
import "./CardDetail.css";

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
  console.log(detail);

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
    country,
    region,
    state,
  } = detail;

  // console.log(typeof lat);
  if (!Calendar) return <div>Cargando Calendario</div>;
  if (!isLoaded) return <div>Loading...</div>;
  if (!detail) return <div>Loading...</div>;
  return (
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
              Recuerda llamar a tu hospedador para coordinar la recepción en su
              hospedaje.
            </span>
          </div>
          <p className="infoD">
            Mantegamos la integridad de los servicios prestados, mantengamos una
            comunidad responsable con los demas.
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
          <p>Verifica en el calendario la disponibilidad del alojamiento.</p>
          <div className="content">
            <Calendar
              propId={id}
              bookings={bookings}
              price={price}
              title={title}
              description={description}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="containerComents">
        <p className="subtitleCardDe">Comentarios</p>
        {Comments?.length > 0 ? (
          <div>
            <div className="contImgComentPrin">
              <div className="contImgComents">
                <img
                  className="imgCom"
                  src="https://www.pngitem.com/pimgs/m/78-786501_black-avatar-png-user-icon-png-transparent-png.png"
                  alt=""
                />
              </div>
              <div className="contFeCom">
                <div>
                  <span className="fecha">Contenedor de Fecha</span>
                </div>
                <div className="comenCont">
                  <p className="comentText">Contenedor de Comentario</p>
                </div>
              </div>
            </div>
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
  );
}
