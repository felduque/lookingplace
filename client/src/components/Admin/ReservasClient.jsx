import React, { useEffect, useState } from "react";
import { deleteProperty, getClientById } from "./Api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { RiEditBoxFill } from "react-icons/ri";
import { ModalForm } from "./ModalForm";
import ReservasProp from "./ReservasProp";
import ReservasTen from "./ReservasTen";
import ReservasComent from "./ReservasComent";
import axios from "axios";

export const ReservacionesCliente = () => {
  const [allPropiertie, setAllPropiertie] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [id, setId] = useState(0);
  const [dataClient, setDataClient] = useState({
    idClient: 0,
    avatar: "",
    email: "",
  });

  useEffect(() => {
    const fetchAllPropierties = async () => {
      const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
      const idClient = storedAuth?.idClient;
      if (storedAuth.role === "Client" || storedAuth.role === "Admin") {
        const allPropierte = await getClientById(idClient);
        console.log("Peticion de Cliente por id", allPropierte.data);
        const prop = allPropierte.data.Properties;
        const booking = allPropierte.data.Bookings;
        // const comments = allPropierte.data.Comments;
        // setAllComments(comments);
        setDataClient({
          idClient: allPropierte.data.id,
          avatar: allPropierte.data.avatar,
          email: allPropierte.data.email,
        }),
          setAllPropiertie(prop);
        setAllBookings(booking);
      } else {
        alert(
          "No tienes propiedades publicadas o No cuentas con permisos necesarios"
        );
      }
    };
    fetchAllPropierties();
  }, [allPropiertie?.length, allBookings?.length]);

  // console.log("Soy allProperty", allPropiertie);
  console.log("Soy allBookings", allBookings);
  console.log("Soy stado Client DATA", dataClient);

  return (
    <>
      <div className="container-list-publish-tenant">
        <h2>Tus Alojamientos Reservados</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            // flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          {allBookings?.map((b) => {
            let ingreso = new Date(b.bookingsPropCli[0]);
            console.log(ingreso);

            let nocheFinal = new Date(
              b.bookingsPropCli[b.bookingsPropCli.length - 1]
            );
            console.log(nocheFinal);
            let salida = new Date(nocheFinal.setDate(nocheFinal.getDate() + 1));

            console.log(salida);

            return (
              <div
                className="container-list-publish-tenant__list__item"
                style={{ width: "400px" }}
              >
                {/* AQUI MODIFICO STYLOS DE CONTENEDOR DE CARDS DE RESERVAS */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    color: "black",
                    gap: "20px",
                    fontSize: "14px",
                    margin: "8px",
                  }}
                >
                  <p>
                    <strong style={{ color: "black" }}>
                      Fecha de ingreso :
                    </strong>{" "}
                    {ingreso.toDateString()}
                  </p>
                  <p>
                    <strong style={{ color: "black" }}>
                      Fecha de salida :
                    </strong>
                    {salida.toDateString()}
                  </p>
                </div>
                <ReservasProp id={b.booking_property} />
                <ReservasTen id={b.booking_tenant} />
                <div className="reservasClientPrincipal">
                  <ReservasComent
                    idPropiedad={b.booking_property}
                    clientCom={b.Client.Comments}
                    idCliente={dataClient.idClient}
                    avatarCliente={dataClient.avatar}
                    emailCliente={dataClient.email}
                  />
                </div>
                <div className="columns">
                  <button
                    className="button is-danger m-5 is-4"
                    onClick={() => {
                      Swal.fire({
                        title: "Quieres cancelar tu reserva?",
                        showDenyButton: true,
                        // showCancelButton: true,
                        confirmButtonText: "Si",
                        denyButtonText: `No`,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          Swal.fire("Cancelado con éxito!", "", "success");
                          axios.delete(
                            `http://localhost:3000/deleteBooking/${b.id}`
                          );
                          setTimeout(() => {
                            window.location.reload(false);
                          }, 2500);
                        } else if (result.isDenied) {
                          Swal.fire("No se cancelo tu Reserva", "", "info");
                        }
                      });
                    }}
                  >
                    Cancelar Reservación
                  </button>
                  {/* <button
                    className="button is-primary m-5 is-4"
                    onClick={(e) => {
                      setModalCalificacion(true);
                    }}
                  >
                    Calificar Alojamiento
                  </button> */}
                </div>
                {/* {modalCalificacion && (
                  <ModalCalificacion
                    closeModal={() => setModalCalificacion(false)}
                  />
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
