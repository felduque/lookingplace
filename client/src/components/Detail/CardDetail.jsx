import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyByIdAsync } from "../../redux/features/getPropertySlice";
import { useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import Calendar from "../Calendario/Calendario";

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
  } = detail;

  console.log(typeof lat);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="title box is-size-1 has-background-dark has-text-centered is-capitalized has-text-white">
        {title}
      </h1>
      <p className="has-text-centered "> Calificacion : {rating}</p>
      <div className="box" style={{ display: "flex" }}>
        <div style={{ width: "60vw" }}>
          <img className="box" src="https://picsum.photos/600/450" alt="" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "50%" }}>
            <img className="box" src="https://picsum.photos/200/250" alt="" />
          </div>
          <div style={{ width: "50%" }}>
            <img className="box" src="https://picsum.photos/200/250" alt="" />
          </div>
          <div style={{ width: "50%" }}>
            <img className="box" src="https://picsum.photos/200/250" alt="" />
          </div>
          <div style={{ width: "50%" }}>
            <img className="box" src="https://picsum.photos/200/250" alt="" />
          </div>
        </div>
      </div>

      <p className="box is-size-3 has-text-white has-background-grey-light has-text-centered">
        {description}
      </p>

      <div className="tile is-ancestor">
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
      </div>
    </div>
  );
}
